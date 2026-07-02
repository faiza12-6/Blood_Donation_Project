import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTint } from "react-icons/fa";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password.");
      return;
    }

    try {
      const res = await axios.post(
        "/api/User/login",
        {
          UserName: username,
          Password: password,
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <form
        onSubmit={login}
        className="bg-white shadow-xl rounded-xl p-10 w-96"
      >
        <div className="flex justify-center mb-5">
          <FaTint className="text-red-600 text-6xl" />
        </div>

        <h2 className="text-3xl font-bold text-center text-red-600 mb-8">
          Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full border rounded-lg p-3 mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg p-3 mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;