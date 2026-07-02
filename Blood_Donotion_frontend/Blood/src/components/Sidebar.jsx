import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserInjured,
  FaHandHoldingHeart,
  FaTint,
  FaChartBar,
  FaInfoCircle,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="fixed left-0 top-0 w-64 h-screen bg-red-700 text-white p-5">
      <h1 className="text-3xl font-bold mb-8">Blood System</h1>

      <nav className="space-y-3">

        <NavLink
          to="/dashboard"
          className="flex items-center gap-3 p-3 rounded hover:bg-red-800"
        >
          <FaTachometerAlt />
          Dashboard
        </NavLink>

        <NavLink
          to="/patients"
          className="flex items-center gap-3 p-3 rounded hover:bg-red-800"
        >
          <FaUserInjured />
          Patients
        </NavLink>

        <NavLink
          to="/donors"
          className="flex items-center gap-3 p-3 rounded hover:bg-red-800"
        >
          <FaHandHoldingHeart />
          Donors
        </NavLink>

        <NavLink
          to="/donations"
          className="flex items-center gap-3 p-3 rounded hover:bg-red-800"
        >
          <FaTint />
          Donations
        </NavLink>

        <NavLink
          to="/reports"
          className="flex items-center gap-3 p-3 rounded hover:bg-red-800"
        >
          <FaChartBar />
          Reports
        </NavLink>

        <NavLink
          to="/about"
          className="flex items-center gap-3 p-3 rounded hover:bg-red-800"
        >
          <FaInfoCircle />
          About
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 mt-10 bg-black px-4 py-2 rounded hover:bg-gray-800"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </nav>
    </div>
  );
}

export default Sidebar;