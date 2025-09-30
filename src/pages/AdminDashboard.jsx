import { semesterConfig } from "../utils/semesterConfig";
import { generateWeeks, formatDate, formatISO } from "../utils/dateUtils";
import { getDayLogs } from "../utils/attendanceHelpers";
import { WEEK_DAYS, ALL_DAYS_OPTION } from "../utils/constants";
import WeekSelector from "../components/WeekSelector";
import DaySelector from "../components/DaySelector";
import AttendanceTable from "../components/AttendanceTable";
import { useState } from "react";
import { attendanceLogs } from "../data/attendanceLogs";
import Navbar from "../components/Navbar";
import { exportToExcel, exportToPDF } from "../utils/exportUtils"; // ✅ import

export default function AdminDashboard() {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const user = savedUser;

  const allFaculty = Object.keys(attendanceLogs);

  const weeks = generateWeeks(
    semesterConfig.firstSemester.start,
    semesterConfig.firstSemester.end
  );

  const [selectedWeek, setSelectedWeek] = useState(weeks[0].week);
  const [selectedDay, setSelectedDay] = useState(ALL_DAYS_OPTION);

  const week = weeks.find((w) => w.week === selectedWeek);

  if (!week) {
    return <div className="p-8">Loading or Week not found...</div>;
  }

  const daysToRender = selectedDay === ALL_DAYS_OPTION ? [...Array(6)] : [0];

  let exportLogs = [];

  daysToRender.forEach((_, i) => {
    let offset = i;
    if (selectedDay !== ALL_DAYS_OPTION) {
      const selectedDayIndex = WEEK_DAYS.indexOf(selectedDay);
      offset = selectedDayIndex;
      if (selectedDayIndex === -1) return null;
    }

    const day = new Date(week.start);
    day.setDate(day.getDate() + offset);
    const isoDate = formatISO(day);

    const currentWeekday = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(day);

    const { logs } = getDayLogs(allFaculty, isoDate, currentWeekday);

    if (logs.length > 0) {
      exportLogs.push(
        ...logs.map((entry) => ({
          faculty: entry.faculty,
          date: formatDate(day, {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          timeIn: entry.log?.timeIn || "-",
          timeOut: entry.log?.timeOut || "-",
          status: entry.status,
        }))
      );
    }
  });

  return (
    <div>
      <Navbar user={user} />
      <div className="p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>

        <div className="mt-6 mb-6 flex space-x-4">
          <WeekSelector
            weeks={weeks}
            selectedWeek={selectedWeek}
            onChange={setSelectedWeek}
          />
          <DaySelector selectedDay={selectedDay} onChange={setSelectedDay} />
        </div>

        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => exportToExcel(exportLogs, "attendance.xlsx")}
            className="bg-red-700 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Export Excel
          </button>
          <button
            onClick={() => exportToPDF(exportLogs, "attendance.pdf")}
            className="bg-red-700 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Export PDF
          </button>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            {selectedDay === ALL_DAYS_OPTION
              ? `Week ${week.week}`
              : `${selectedDay} of Week ${week.week}`}
            , {formatDate(week.start, { year: "numeric" })}
          </h2>

          {daysToRender.map((_, i) => {
            let offset = i;
            if (selectedDay !== ALL_DAYS_OPTION) {
              const selectedDayIndex = WEEK_DAYS.indexOf(selectedDay);
              offset = selectedDayIndex;
              if (selectedDayIndex === -1) return null;
            }

            const day = new Date(week.start);
            day.setDate(day.getDate() + offset);
            const isoDate = formatISO(day);

            const currentWeekday = new Intl.DateTimeFormat("en-US", {
              weekday: "long",
            }).format(day);

            const { logs, holiday } = getDayLogs(
              allFaculty,
              isoDate,
              currentWeekday
            );

            return (
              <AttendanceTable
                key={isoDate}
                day={day}
                logs={logs}
                holiday={holiday}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
