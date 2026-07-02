import { useEffect, useState } from "react";
import {
  getDonors,
  addDonor,
  updateDonor,
  deleteDonor,
  getDonations,
  deleteDonation,
} from "../services/api";
import SearchBar from "../components/SearchBar";

function Donors() {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    bloodType: "",
    phone: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getDonors();
    setDonors(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ fullName: "", bloodType: "", phone: "" });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await updateDonor({ donorId: editingId, ...form });
    } else {
      await addDonor(form);
    }

    resetForm();
    load();
  };

  const handleEdit = (d) => {
    setForm({
      fullName: d.fullName,
      bloodType: d.bloodType,
      phone: d.phone,
    });
    setEditingId(d.donorId);
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Deleting this donor will also delete all of their donations. Continue?"
      )
    ) {
      return;
    }

    // FOREIGN KEY: remove dependent donations first
    const donationRes = await getDonations();
    const relatedDonations = donationRes.data.filter(
      (d) => d.donorId === id
    );
    await Promise.all(
      relatedDonations.map((d) => deleteDonation(d.donationId))
    );

    await deleteDonor(id);
    if (editingId === id) resetForm();
    load();
  };

  const filtered = donors.filter(
    (d) =>
      d.fullName.toLowerCase().includes(search.toLowerCase()) ||
      String(d.donorId).includes(search)
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        Donors
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6 grid grid-cols-3 gap-3"
      >
        <input
          className="border p-2 rounded"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
        />

        <input
          className="border p-2 rounded"
          name="bloodType"
          placeholder="Blood Type"
          value={form.bloodType}
          onChange={handleChange}
        />

        <input
          className="border p-2 rounded"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-red-600 text-white p-2 rounded col-span-2"
        >
          {editingId ? "Update Donor" : "Add Donor"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-300 text-gray-800 p-2 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search donors..."
      />

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-red-600 text-white">
          <tr>
            <th className="p-2">ID</th>
            <th>Name</th>
            <th>Blood</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((d) => (
            <tr key={d.donorId} className="text-center border">
              <td className="p-2">{d.donorId}</td>
              <td>{d.fullName}</td>
              <td>{d.bloodType}</td>
              <td>{d.phone}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => handleEdit(d)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(d.donorId)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Donors;
