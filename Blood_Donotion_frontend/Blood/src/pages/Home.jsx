import { Link } from "react-router-dom";
import {
  FaTint,
  FaUserInjured,
  FaHandHoldingHeart,
  FaHeartbeat,
} from "react-icons/fa";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Hero */}
      <div className="bg-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-8">

          <h1 className="text-5xl font-bold mb-5">
            Blood Donation Management System
          </h1>

          <p className="text-xl mb-8">
            Save Lives. Donate Blood. Manage Patients,
            Donors and Donations Easily.
          </p>

          <div className="space-x-4">

            <Link
              to="/login"
              className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200"
            >
              Login
            </Link>

            <Link
              to="/dashboard"
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
            >
              Dashboard
            </Link>

          </div>

        </div>
      </div>

      {/* Features */}

      <div className="max-w-7xl mx-auto py-16 px-8">

        <h2 className="text-4xl font-bold text-center mb-12 text-red-600">
          System Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-white shadow rounded-xl p-6 text-center hover:shadow-xl transition">

            <FaHeartbeat className="text-red-600 text-5xl mx-auto mb-4" />

            <h3 className="text-xl font-bold">
              Patients
            </h3>

            <p className="text-gray-500 mt-3">
              Register and manage patient information.
            </p>

          </div>

          <div className="bg-white shadow rounded-xl p-6 text-center hover:shadow-xl transition">

            <FaHandHoldingHeart className="text-green-600 text-5xl mx-auto mb-4" />

            <h3 className="text-xl font-bold">
              Donors
            </h3>

            <p className="text-gray-500 mt-3">
              Store donor information safely.
            </p>

          </div>

          <div className="bg-white shadow rounded-xl p-6 text-center hover:shadow-xl transition">

            <FaTint className="text-blue-600 text-5xl mx-auto mb-4" />

            <h3 className="text-xl font-bold">
              Donations
            </h3>

            <p className="text-gray-500 mt-3">
              Record every blood donation.
            </p>

          </div>

          <div className="bg-white shadow rounded-xl p-6 text-center hover:shadow-xl transition">

            <FaUserInjured className="text-purple-600 text-5xl mx-auto mb-4" />

            <h3 className="text-xl font-bold">
              Reports
            </h3>

            <p className="text-gray-500 mt-3">
              View reports and statistics instantly.
            </p>

          </div>

        </div>

      </div>

      {/* About */}

      <div className="bg-white py-16">

        <div className="max-w-5xl mx-auto text-center px-8">

          <h2 className="text-4xl font-bold text-red-600 mb-6">
            Why Blood Donation?
          </h2>

          <p className="text-gray-600 leading-8">
            Blood donation saves lives every day. This system helps hospitals
            manage donors, patients, donations, reports, and users quickly
            and securely using React, ASP.NET Core Web API, and SQL Server.
          </p>

        </div>

      </div>

      {/* Footer */}

      <footer className="bg-gray-900 text-white text-center py-6">
        <p>
          © 2026 Blood Donation Management System. All Rights Reserved.
        </p>
      </footer>

    </div>
  );
}

export default Home;