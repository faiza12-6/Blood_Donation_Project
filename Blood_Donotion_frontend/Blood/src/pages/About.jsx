import {
  FaTint,
  FaHeartbeat,
  FaHospital,
  FaUsers,
} from "react-icons/fa";

function About() {
  return (
    <div className="space-y-8">

      <div className="bg-red-600 text-white rounded-xl p-8 shadow">
        <h1 className="text-4xl font-bold">
          Blood Donation Management System
        </h1>

        <p className="mt-4 text-lg">
          This system helps hospitals manage patients, donors,
          blood donations, reports and users efficiently.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <FaTint className="text-red-600 text-5xl mx-auto mb-3" />
          <h2 className="font-bold text-xl">Blood Donation</h2>

          <p className="text-gray-500 mt-2">
            Store and manage blood donation records.
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <FaHeartbeat className="text-pink-600 text-5xl mx-auto mb-3" />
          <h2 className="font-bold text-xl">Patients</h2>

          <p className="text-gray-500 mt-2">
            Register and manage patient information.
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <FaHospital className="text-blue-600 text-5xl mx-auto mb-3" />
          <h2 className="font-bold text-xl">Hospital</h2>

          <p className="text-gray-500 mt-2">
            Organize blood requests and donation history.
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <FaUsers className="text-green-600 text-5xl mx-auto mb-3" />
          <h2 className="font-bold text-xl">Users</h2>

          <p className="text-gray-500 mt-2">
            Secure user login and system management.
          </p>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-8">

        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Project Information
        </h2>

        <table className="w-full border">

          <tbody>

            <tr className="border">
              <td className="font-bold p-3">Project</td>
              <td className="p-3">Blood Donation Management System</td>
            </tr>

            <tr className="border">
              <td className="font-bold p-3">Frontend</td>
              <td className="p-3">React + Tailwind CSS</td>
            </tr>

            <tr className="border">
              <td className="font-bold p-3">Backend</td>
              <td className="p-3">ASP.NET Core Web API</td>
            </tr>

            <tr className="border">
              <td className="font-bold p-3">Database</td>
              <td className="p-3">SQL Server</td>
            </tr>

            <tr className="border">
              <td className="font-bold p-3">CRUD</td>
              <td className="p-3">Patients, Donors, Donations, Users</td>
            </tr>

          </tbody>

        </table>

      </div>

      <div className="bg-gray-900 text-white rounded-xl p-6 text-center">

        <h2 className="text-2xl font-bold">
          Blood Saves Lives ❤️
        </h2>

        <p className="mt-2 text-gray-300">
          Every donation can save multiple lives.
          Thank you for supporting blood donation.
        </p>

      </div>

    </div>
  );
}

export default About;