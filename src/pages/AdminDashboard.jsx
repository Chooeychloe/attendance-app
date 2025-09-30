import { useState, useEffect } from "react";
import { semesterConfig } from "../utils/semesterConfig";
import { generateWeeks, formatDate, toDateKey } from "../utils/dateUtils";
import { WEEK_DAYS, ALL_DAYS_OPTION } from "../utils/constants";
import WeekSelector from "../components/WeekSelector";
import DaySelector from "../components/DaySelector";
import AttendanceTable from "../components/AttendanceTable";
import Navbar from "../components/Navbar";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import AttendanceLegend from "../components/AttendanceLegend";
import ExportButtons from "../components/ExportButtons";

export default function AdminDashboard() {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const user = savedUser;

  const weeks = generateWeeks(
    semesterConfig.firstSemester.start,
    semesterConfig.firstSemester.end
  );

  const [selectedWeek, setSelectedWeek] = useState(weeks[0].week);
  const [selectedDay, setSelectedDay] = useState(ALL_DAYS_OPTION);
  const [logs, setLogs] = useState([]); 

  const week = weeks.find((w) => w.week === selectedWeek);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const q = query(collection(db, "attendanceLogs"));
        const querySnapshot = await getDocs(q);

        const logsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setLogs(logsData);
      } catch (err) {
        console.error("Error fetching logs:", err);
      }
    };
    fetchLogs();
  }, []);

  if (!week) return <div className="p-8">Loading...</div>;


  const weekDayDateKeys = [];
  const daysInWeek = 6;
  for (let i = 0; i < daysInWeek; i++) {
    const day = new Date(week.start);
    day.setDate(day.getDate() + i);
    weekDayDateKeys.push(toDateKey(day));
  }

  let logsToExport = logs.filter((log) => weekDayDateKeys.includes(log.date));

  if (selectedDay !== ALL_DAYS_OPTION) {
    const selectedDayIndex = WEEK_DAYS.indexOf(selectedDay);
    if (selectedDayIndex !== -1) {
      const selectedDate = new Date(week.start);
      selectedDate.setDate(selectedDate.getDate() + selectedDayIndex);
      const selectedDateKey = toDateKey(selectedDate);

      logsToExport = logsToExport.filter((log) => log.date === selectedDateKey);
    } else {
      logsToExport = [];
    }
  }

  const daysToRender = [];
  if (selectedDay === ALL_DAYS_OPTION) {
    for (let i = 0; i < daysInWeek; i++) {
      const day = new Date(week.start);
      day.setDate(day.getDate() + i);
      daysToRender.push(day);
    }
  } else {
    const selectedDayIndex = WEEK_DAYS.indexOf(selectedDay);
    if (selectedDayIndex !== -1) {
      const day = new Date(week.start);
      day.setDate(day.getDate() + selectedDayIndex);
      daysToRender.push(day);
    }
  }

  return (
    <div>
      <Navbar user={user} />

      <div className="p-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <div className="mt-6 mb-6 flex space-x-4">
          <WeekSelector
            weeks={weeks}
            selectedWeek={selectedWeek}
            onChange={setSelectedWeek}
          />
          <DaySelector selectedDay={selectedDay} onChange={setSelectedDay} />
        </div>
        <AttendanceLegend />

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            {selectedDay === ALL_DAYS_OPTION
              ? `Week ${week.week}`
              : `${selectedDay} of Week ${week.week}`}
            , {formatDate(week.start, { year: "numeric" })}
          </h2>

          <ExportButtons
            logs={logsToExport}
            week={week}
            selectedDay={selectedDay}
          />
          {daysToRender.map((day) => {
            const dateKey = toDateKey(day);

            const dayLogs = logsToExport.filter((log) => log.date === dateKey);

            return (
              <AttendanceTable
                key={dateKey}
                day={day}
                logs={dayLogs}
                holiday={null}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
