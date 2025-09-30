import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../data/users"; // make sure each faculty has facultyId in this file

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Save only necessary fields in localStorage
      const userData = {
        username: user.username,
        role: user.role,
        facultyId: user.facultyId || null, // admin won't have this
      };

      localStorage.setItem("user", JSON.stringify(userData));

      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "faculty") {
        navigate("/faculty");
      } else {
        navigate("/"); // fallback route
      }
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border rounded mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}
