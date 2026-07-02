import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const today = new Date().toLocaleDateString();

  return (
    <div className="flex items-center justify-between bg-white shadow-md rounded-lg px-6 py-4 mb-6">
      <div>
        <h2 className="text-2xl font-bold text-red-600">
          Blood Donation Management System
        </h2>
        <p className="text-gray-500 text-sm">{today}</p>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-red-600" size={35} />
          <div>
            <h4 className="font-semibold">Admin</h4>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;