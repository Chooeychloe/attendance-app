import React from "react";
import { exportToExcel, exportToPDF } from "../utils/exportUtils";
import { formatDate } from "../utils/dateUtils";
import { ALL_DAYS_OPTION, WEEK_DAYS } from "../utils/constants";

export default function ExportButtons({ logs, week, selectedDay }) {
  
  const getFilenamePrefix = () => {
    if (!week) {
      return "Attendance_Report";
    }

    let prefix = `Attendance for Week ${week.week}`; 
    
    if (selectedDay !== ALL_DAYS_OPTION) {
      const selectedDate = new Date(week.start); 
      const dayIndex = WEEK_DAYS.indexOf(selectedDay);
      
      if (dayIndex !== -1) {
        selectedDate.setDate(selectedDate.getDate() + dayIndex);
      }
      
      const dateString = formatDate(selectedDate, {
        month: "short",
        day: "numeric",
      });
      prefix += `_${selectedDay}_${dateString}`;
    }
    return prefix;
  };
  
  const handleExportExcel = () => {
    const prefix = getFilenamePrefix(); 
    const filename = `${prefix}.xlsx`;
    exportToExcel(logs, filename, prefix); 
  };

  const handleExportPDF = () => {
    const prefix = getFilenamePrefix();
    const filename = `${prefix}.pdf`;
    exportToPDF(logs, filename, prefix);
  };
  
  if (!week) {
    return null;
  }

  return (
    <div className="flex space-x-4 p-4 border-t border-gray-200">
      <button
        onClick={handleExportExcel}
        className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-150"
      >
        Export to Excel (.xlsx) 
      </button>
      <button
        onClick={handleExportPDF}
        className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-150"
      >
        Export to PDF (.pdf) 
      </button>
    </div>
  );
}