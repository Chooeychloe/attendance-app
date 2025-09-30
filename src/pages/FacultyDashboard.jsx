import { useState, useEffect } from "react";
import { semesterConfig } from "../utils/semesterConfig";
import { generateWeeks, formatDate, toDateKey } from "../utils/dateUtils";
import { WEEK_DAYS, ALL_DAYS_OPTION } from "../utils/constants";
import WeekSelector from "../components/WeekSelector";
import DaySelector from "../components/DaySelector";
import AttendanceTable from "../components/AttendanceTable";
import Navbar from "../components/Navbar";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";

export default function FacultyDashboard() {
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
        const q = query(
          collection(db, "attendanceLogs"),
          where("faculty", "==", user.username)
        );
        const querySnapshot = await getDocs(q);

        const logsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setLogs(logsData);
      } catch (err) {
        console.error("Error fetching faculty logs:", err);
      }
    };

    fetchLogs();
  }, [user]);

  if (!week) return <div className="p-8">Loading...</div>;

  // render all weekdays or one selected
  const daysToRender = selectedDay === ALL_DAYS_OPTION ? [...Array(6)] : [0];

  return (
    <div>
      <Navbar user={user} />

      <div className="p-8">
        <h1 className="text-2xl font-bold">Faculty Dashboard</h1>

        <div className="mt-6 mb-6 flex space-x-4">
          <WeekSelector
            weeks={weeks}
            selectedWeek={selectedWeek}
            onChange={setSelectedWeek}
          />
          <DaySelector selectedDay={selectedDay} onChange={setSelectedDay} />
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

            // ✅ local-safe key
            const dateKey = toDateKey(day);

            // ✅ filter logs with string equality
            const dayLogs = logs.filter((log) => log.date === dateKey);

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
