import { useEffect, useState } from "react";
import {
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
  getDonations,
  deleteDonation,
} from "../services/api";
import SearchBar from "../components/SearchBar";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    bloodType: "",
    phone: "",
  });
  const [editingId, setEditingId] = useState(null);

  // LOAD DATA
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getPatients();
    setPatients(res.data);
  };

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ fullName: "", bloodType: "", phone: "" });
    setEditingId(null);
  };

  // ADD / UPDATE PATIENT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await updatePatient({ patientId: editingId, ...form });
    } else {
      await addPatient(form);
    }

    resetForm();
    loadData();
  };

  // EDIT PATIENT
  const handleEdit = (p) => {
    setForm({
      fullName: p.fullName,
      bloodType: p.bloodType,
      phone: p.phone,
    });
    setEditingId(p.patientId);
  };

  // DELETE PATIENT
  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Deleting this patient will also delete all of their donations. Continue?"
      )
    ) {
      return;
    }

    // FOREIGN KEY: remove dependent donations first
    const donationRes = await getDonations();
    const relatedDonations = donationRes.data.filter(
      (d) => d.patientId === id
    );
    await Promise.all(
      relatedDonations.map((d) => deleteDonation(d.donationId))
    );

    await deletePatient(id);
    if (editingId === id) resetForm();
    loadData();
  };

  const filtered = patients.filter(
    (p) =>
      p.fullName.toLowerCase().includes(search.toLowerCase()) ||
      String(p.patientId).includes(search)
  );

  return (
    <div>
      {/* TITLE */}
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Patients
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
          {editingId ? "Update Patient" : "Add Patient"}
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
        placeholder="Search patients..."
      />

      {/* TABLE */}
      <table className="w-full bg-white shadow rounded">
        <thead className="bg-red-600 text-white">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Blood</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((p) => (
            <tr key={p.patientId} className="border text-center">
              <td className="p-2">{p.patientId}</td>
              <td className="p-2">{p.fullName}</td>
              <td className="p-2">{p.bloodType}</td>
              <td className="p-2">{p.phone}</td>

              <td className="p-2 space-x-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.patientId)}
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

export default Patients;
