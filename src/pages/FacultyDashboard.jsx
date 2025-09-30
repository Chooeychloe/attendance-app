import { semesterConfig } from "../utils/semesterConfig";
import { generateWeeks, formatDate, formatISO } from "../utils/dateUtils";
import { getStatus } from "../utils/checkAttendance";
import { schedules } from "../data/schedules";
import { attendanceLogs } from "../data/attendanceLogs";
import { WEEK_DAYS, ALL_DAYS_OPTION } from "../utils/constants";
import WeekSelector from "../components/WeekSelector";
import DaySelector from "../components/DaySelector";
import AttendanceTable from "../components/AttendanceTable";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function FacultyDashboard() {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const user = savedUser; // instead of useLocation()
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

  return (
    <div>
      <Navbar user={user} />

      <div className="p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
           
            <div>
              <h1 className="text-2xl font-bold">Faculty Dashboard</h1>
            </div>
          </div>
        </div>

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
            const isoDate = formatISO(day);

            const currentWeekday = new Intl.DateTimeFormat("en-US", {
              weekday: "long",
            }).format(day);

            const schedule = schedules[user.username]?.find(
              (s) => s.day === currentWeekday
            );
            const log = attendanceLogs[user.username]?.find(
              (l) => l.date === isoDate
            );

            let status;
            if (log) {
              status = getStatus(schedule, log);
            } else if (schedule) {
              status = "Absent";
            } else {
              status = "No Class";
            }

            const logs = [
              {
                faculty: user.username,
                log,
                date: isoDate,
                status,
              },
            ];

            return (
              <AttendanceTable
                key={isoDate}
                day={day}
                logs={logs}
                holiday={null}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
