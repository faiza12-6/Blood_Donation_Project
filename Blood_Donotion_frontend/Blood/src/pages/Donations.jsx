import { useEffect, useState } from "react";
import {
  getDonations,
  getDonors,
  getPatients,
  addDonation,
  updateDonation,
  deleteDonation,
} from "../services/api";
import SearchBar from "../components/SearchBar";

const emptyForm = { donorId: "", patientId: "", donationDate: "" };

function Donations() {
  const [donations, setDonations] = useState([]);
  const [donors, setDonors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const d = await getDonations();
    const dn = await getDonors();
    const p = await getPatients();

    setDonations(d.data);
    setDonors(dn.data);
    setPatients(p.data);
  };

  const getDonor = (id) =>
    donors.find((x) => x.donorId === id)?.fullName || "Unknown";

  const getPatient = (id) =>
    patients.find((x) => x.patientId === id)?.fullName || "Unknown";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      donorId: Number(form.donorId),
      patientId: Number(form.patientId),
      donationDate: form.donationDate,
    };

    if (editingId) {
      await updateDonation({ donationId: editingId, ...payload });
    } else {
      await addDonation(payload);
    }

    resetForm();
    load();
  };

  const handleEdit = (d) => {
    setForm({
      donorId: d.donorId,
      patientId: d.patientId,
      donationDate: d.donationDate?.split("T")[0] || "",
    });
    setEditingId(d.donationId);
  };

  const handleDelete = async (id) => {
    await deleteDonation(id);
    if (editingId === id) resetForm();
    load();
  };

  const filtered = donations.filter(
    (x) =>
      getDonor(x.donorId).toLowerCase().includes(search.toLowerCase()) ||
      getPatient(x.patientId).toLowerCase().includes(search.toLowerCase()) ||
      String(x.donationId).includes(search)
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        Donations
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6 grid grid-cols-3 gap-3"
      >
        <select
          className="border p-2 rounded"
          name="donorId"
          value={form.donorId}
          onChange={handleChange}
        >
          <option value="">Select Donor</option>
          {donors.map((d) => (
            <option key={d.donorId} value={d.donorId}>
              {d.fullName}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          name="patientId"
          value={form.patientId}
          onChange={handleChange}
        >
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p.patientId} value={p.patientId}>
              {p.fullName}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="border p-2 rounded"
          name="donationDate"
          value={form.donationDate}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-red-600 text-white p-2 rounded col-span-2"
        >
          {editingId ? "Update Donation" : "Add Donation"}
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
        placeholder="Search donations..."
      />

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-red-600 text-white">
          <tr>
            <th className="p-2">ID</th>
            <th>Donor</th>
            <th>Patient</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((d) => (
            <tr key={d.donationId} className="text-center border">
              <td className="p-2">{d.donationId}</td>
              <td>{getDonor(d.donorId)}</td>
              <td>{getPatient(d.patientId)}</td>
              <td>{d.donationDate}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => handleEdit(d)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(d.donationId)}
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

export default Donations;
