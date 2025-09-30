import { useNavigate } from "react-router-dom";

export default function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center bg-blue-600 px-6 py-3 text-white">
      <h1 className="text-lg font-bold">Attendance System</h1>

      <div className="flex items-center space-x-4">
        {user?.avatar && (
          <img
            src={user.avatar}
            alt={user.username}
            className="w-10 h-10 rounded-full border-2 border-white"
          />
        )}
        <span>{user?.username}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
