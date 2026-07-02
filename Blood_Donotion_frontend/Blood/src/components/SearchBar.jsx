import { FaSearch } from "react-icons/fa";

function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative mb-5">
      <FaSearch className="absolute left-3 top-4 text-gray-400" />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
      />
    </div>
  );
}

export default SearchBar;