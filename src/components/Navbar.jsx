import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";

export default function Navbar({ user }) {
  const navigate = useNavigate();
  const avatarPath = user?.avatar ? `/images/${user.avatar}` : null;

  const handleLogout = async () => {
    try {
      await signOut(auth); // ✅ Firebase logout
      localStorage.removeItem("user"); // ✅ Clear role data
      navigate("/login");
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  return (
    <nav className="flex justify-between items-center bg-blue-600 px-6 py-3 text-white shadow-md">
      <h1 className="text-lg font-bold">Attendance System</h1>

      <div className="flex items-center space-x-6">
        {/* ✅ Dynamic links based on role */}
        {/* {user?.role === "admin" && (
          <>
            <Link to="/admin" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/admin/manage-users" className="hover:underline">
              Manage Users
            </Link>
            <Link to="/admin/reports" className="hover:underline">
              Reports
            </Link>
          </>
        )}

        {user?.role === "faculty" && (
          <>
            <Link to="/faculty" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/faculty/my-attendance" className="hover:underline">
              My Attendance
            </Link>
            <Link to="/faculty/schedule" className="hover:underline">
              Schedule
            </Link>
          </>
        )} */}

        {/* ✅ User info + logout */}
        <div className="flex items-center space-x-3">
          {user?.avatar && (
            <img
              src={avatarPath}
              alt={user.username}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          )}
          <span className="font-medium">{user?.username}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
