import { getStatus } from "./checkAttendance";
import { getHoliday } from "./dateUtils";
import { schedules } from "../data/schedules";
import { attendanceLogs } from "../data/attendanceLogs";

export function getDayLogs(allFaculty, isoDate, currentWeekday) {
  const holiday = getHoliday(isoDate);

  const logs = allFaculty
    .map((faculty) => {
      const log = attendanceLogs[faculty]?.find((l) => l.date === isoDate);
      const schedule = schedules[faculty]?.find((s) => s.day === currentWeekday);

      let status;
      if (holiday) {
        status = `Holiday: ${holiday.name}`;
      } else if (log) {
        status = getStatus(schedule, log);
      } else if (schedule) {
        status = "Absent";
      } else {
        status = "No Class";
      }

      return { faculty, log, date: isoDate, status };
    })
    .filter(Boolean);

  return { logs, holiday };
}
