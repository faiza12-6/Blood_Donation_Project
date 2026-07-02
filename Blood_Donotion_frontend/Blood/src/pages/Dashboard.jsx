import { useEffect, useState } from "react";
import {
  getPatients,
  getDonors,
  getDonations,
  
} from "../services/api";

import {
  FaUserInjured,
  FaHandHoldingHeart,
  FaTint,
} from "react-icons/fa";

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [donors, setDonors] = useState([]);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const patientRes = await getPatients();
      const donorRes = await getDonors();
      const donationRes = await getDonations();

      setPatients(patientRes.data);
      setDonors(donorRes.data);
      setDonations(donationRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-red-600">
            Dashboard
          </h1>
          <p className="text-gray-500">
            Blood Donation Management System
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white shadow rounded-xl p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Patients</p>
            <h2 className="text-4xl font-bold">
              {patients.length}
            </h2>
          </div>
          <FaUserInjured className="text-red-600 text-5xl" />
        </div>

        <div className="bg-white shadow rounded-xl p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Donors</p>
            <h2 className="text-4xl font-bold">
              {donors.length}
            </h2>
          </div>
          <FaHandHoldingHeart className="text-green-600 text-5xl" />
        </div>

        <div className="bg-white shadow rounded-xl p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Donations</p>
            <h2 className="text-4xl font-bold">
              {donations.length}
            </h2>
          </div>
          <FaTint className="text-blue-600 text-5xl" />
        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow">

        <div className="border-b p-4">
          <h2 className="text-xl font-bold">
            Recent Donations
          </h2>
        </div>

        <table className="w-full">

          <thead className="bg-red-600 text-white">
            <tr>
              <th className="py-3">Donation ID</th>
              <th>Donor ID</th>
              <th>Patient ID</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>

            {donations.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No Donations Found
                </td>
              </tr>
            ) : (
              donations.map((item) => (
                <tr
                  key={item.donationId}
                  className="text-center border-b hover:bg-gray-100"
                >
                  <td className="py-3">{item.donationId}</td>
                  <td>{item.donorId}</td>
                  <td>{item.patientId}</td>
                  <td>
                    {new Date(item.donationDate).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Dashboard;