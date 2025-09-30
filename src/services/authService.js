import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";

export async function loginUser(username, password) {
  // Revert to the original query that uses BOTH username and password
  const usersRef = collection(db, "users");
  const q = query(
    usersRef,
    where("username", "==", username),
    where("password", "==", password)
  );

  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const user = snapshot.docs[0].data();
    localStorage.setItem("user", JSON.stringify(user));
    console.log("User logged in:", user);
    return user;
  } else {
    throw new Error("Invalid credentials");
  }
}