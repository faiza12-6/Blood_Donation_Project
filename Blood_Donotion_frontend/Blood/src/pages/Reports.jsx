import { useEffect, useState } from "react";
import {
  getPatients,
  getDonors,
  getDonations,
} from "../services/api";

function Reports() {
  const [patients, setPatients] = useState([]);
  const [donors, setDonors] = useState([]);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const p = await getPatients();
      const d = await getDonors();
      const dn = await getDonations();

      setPatients(p.data);
      setDonors(d.data);
      setDonations(dn.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold text-red-600">
        Reports
      </h1>

      {/* SUMMARY - FIXED */}
      <div className="grid grid-cols-3 gap-4">

        <div className="bg-white shadow rounded p-5">
          <h2 className="text-gray-500">Patients</h2>
          <p className="text-3xl font-bold">{patients.length}</p>
        </div>

        <div className="bg-white shadow rounded p-5">
          <h2 className="text-gray-500">Donors</h2>
          <p className="text-3xl font-bold">{donors.length}</p>
        </div>

        <div className="bg-white shadow rounded p-5">
          <h2 className="text-gray-500">Donations</h2>
          <p className="text-3xl font-bold">{donations.length}</p>
        </div>

      </div>

      {/* PATIENTS */}
      <div className="bg-white shadow rounded p-5">
        <h2 className="text-xl font-bold mb-3">Patients</h2>

        <table className="w-full">
          <thead className="bg-red-600 text-white">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Blood</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((p) => (
              <tr key={p.patientId} className="text-center border-b">
                <td>{p.patientId}</td>
                <td>{p.fullName}</td>
                <td>{p.bloodType}</td>
                <td>{p.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DONORS */}
      <div className="bg-white shadow rounded p-5">
        <h2 className="text-xl font-bold mb-3">Donors</h2>

        <table className="w-full">
          <thead className="bg-green-600 text-white">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Blood</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {donors.map((d) => (
              <tr key={d.donorId} className="text-center border-b">
                <td>{d.donorId}</td>
                <td>{d.fullName}</td>
                <td>{d.bloodType}</td>
                <td>{d.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DONATIONS */}
      <div className="bg-white shadow rounded p-5">
        <h2 className="text-xl font-bold mb-3">Donations</h2>

        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th>ID</th>
              <th>Donor ID</th>
              <th>Patient ID</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {donations.map((d) => (
              <tr key={d.donationId} className="text-center border-b">
                <td>{d.donationId}</td>
                <td>{d.donorId}</td>
                <td>{d.patientId}</td>
                <td>{d.donationDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Reports;