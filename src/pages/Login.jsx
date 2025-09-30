import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService"; // ✅ use helper

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // In Login.jsx

  const handleLogin = async () => {
    try {
      // 💡 FIX: Trim whitespace from inputs before calling the service
      const trimmedUsername = username.trim();
      const trimmedPassword = password.trim();

      // Check if fields are empty after trimming
      if (!trimmedUsername || !trimmedPassword) {
        setError("Please enter both username and password.");
        return; // Stop execution if fields are empty
      }

      // Use the trimmed values for login
      const user = await loginUser(trimmedUsername, trimmedPassword);

      // ... (rest of your navigation logic)
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "faculty") {
        navigate("/faculty");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

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
