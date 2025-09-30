import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// exportToExcel remains unchanged (it's correct)
export function exportToExcel(logs, filename = "attendance.xlsx", titlePrefix = "Attendance Report") {

  const headerRow = [
    { [titlePrefix]: titlePrefix }
  ];

  const logsWorksheet = XLSX.utils.json_to_sheet(logs, { origin: "A2" });

  XLSX.utils.sheet_add_json(logsWorksheet, headerRow, {
    skipHeader: true,
    origin: "A1"
  });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, logsWorksheet, "Attendance");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, filename);
}


export function exportToPDF(logs, filename = "attendance.pdf", titlePrefix = "Attendance Report") {
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text(`${titlePrefix}`, 14, 15);

  const groupedLogs = logs.reduce((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = [];
    }
    acc[entry.date].push(entry);
    return acc;
  }, {});

  let currentY = 25;

  const sortedDates = Object.keys(groupedLogs).sort((a, b) => new Date(a) - new Date(b));

  sortedDates.forEach((date) => {
    const entries = groupedLogs[date];

    if (currentY > 280) {
      doc.addPage();
      currentY = 15;
    }

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
      headStyles: { fillColor: [41, 128, 185] },
      styles: { fontSize: 10 },
      margin: { left: 14, right: 14 },
    });

    currentY = doc.lastAutoTable.finalY + 10;
  });

  doc.save(filename);
}