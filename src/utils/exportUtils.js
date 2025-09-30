import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportToExcel(logs, filename = "attendance.xlsx") {
  const worksheet = XLSX.utils.json_to_sheet(logs);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, filename);
}


export function exportToPDF(logs, filename = "attendance.pdf") {
  const doc = new jsPDF();
  doc.text("Attendance Report", 14, 15);

  const groupedLogs = logs.reduce((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = [];
    }
    acc[entry.date].push(entry);
    return acc;
  }, {});

  let currentY = 25;

  Object.keys(groupedLogs).forEach((date) => {
    const entries = groupedLogs[date];

    doc.setFontSize(12);
    doc.text(date, 14, currentY);
    currentY += 5;

    autoTable(doc, {
      startY: currentY,
      head: [["Faculty", "Time In", "Time Out", "Status"]],
      body: entries.map((entry) => [
        entry.faculty,
        entry.timeIn,
        entry.timeOut,
        entry.status,
      ]),
      theme: "grid",
      headStyles: { fillColor: [41, 128, 185] }, // Blue header
      styles: { fontSize: 10 },
      margin: { left: 14, right: 14 },
    });

    currentY = doc.lastAutoTable.finalY + 10;
  });

  doc.save(filename);
}


// src/utils/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);

// ✅ Firestore instance
export const db = getFirestore(app);
