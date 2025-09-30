// import { Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../utils/firebaseConfig";

// export default function ProtectedRoute({ children, role }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // Check localStorage for role (set at login)
//         const storedUser = JSON.parse(localStorage.getItem("user"));
//         setCurrentUser({ ...user, role: storedUser?.role });
//       } else {
//         setCurrentUser(null);
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   if (loading) {
//     return <div className="p-8 text-center">Loading...</div>;
//   }

//   if (!currentUser) {
//     return <Navigate to="/login" replace />;
//   }

//   if (role && currentUser.role !== role) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children, role }) {
  // Use state to manage the user object and loading status
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Read the user data from localStorage immediately
    const userString = localStorage.getItem("user");
    
    if (userString) {
      // 2. Parse the user data (which includes the 'role' property)
      const userData = JSON.parse(userString);
      setUser(userData);
    } 
    
    setLoading(false); // Done checking, regardless of result
  }, []);

  if (loading) {
    // Show a loading indicator while checking local storage
    return <div className="p-8 text-center">Loading...</div>;
  }

  // A. Check if user is logged in (Authentication)
  if (!user) {
    console.log("Redirecting to /login: User not found in localStorage.");
    return <Navigate to="/login" replace />;
  }

  // B. Check if the user has the required role (Authorization)
  if (role && user.role !== role) {
    console.log(`Redirecting: User role (${user.role}) does not match required role (${role}).`);
    
    // A better redirect than /login for unauthorized users:
    // This sends them to the root, which your App.jsx redirects to /login.
    // Ideally, you'd send them to their *own* dashboard.
    return <Navigate to="/" replace />; 
  }

  // C. Authorized: Render the dashboard
  return children;
}