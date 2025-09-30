export const users = [
  { 
    username: "Jovelyn Ocampo", 
    password: "admin123", 
    role: "admin",
    avatar: "/images/ocampo.jpg"
    // no facultyId needed for admin
  },
  { 
    username: "Clarissa Rostrollo", 
    password: "pass123", 
    role: "faculty", 
    facultyId: 1, // 👈 match Firestore
    avatar: "/images/rostrollo.jpg"
  },
  { 
    username: "faculty2", 
    password: "pass456", 
    role: "faculty", 
    facultyId: 2, // 👈 match Firestore
    avatar: "/images/faculty2.jpg"
  },
];
