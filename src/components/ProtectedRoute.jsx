
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children, role }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    
    if (userString) {
      const userData = JSON.parse(userString);
      setUser(userData);
    } 
    
    setLoading(false); 
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!user) {
    console.log("Redirecting to /login: User not found in localStorage.");
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    console.log(`Redirecting: User role (${user.role}) does not match required role (${role}).`);
 
    return <Navigate to="/" replace />; 
  }

  return children;
}