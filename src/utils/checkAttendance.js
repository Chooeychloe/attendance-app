export function getStatus(schedule, log) {
  if (!schedule) return "No Class";

  const [startHour, startMinute] = schedule.start.split(":").map(Number);
  const [logHour, logMinute] = log.timeIn.split(":").map(Number);

  const scheduledMinutes = startHour * 60 + startMinute;
  const logMinutes = logHour * 60 + logMinute;

  if (logMinutes <= scheduledMinutes) return "On Time";
  if (logMinutes <= scheduledMinutes + 15) return "Late";
  return "Absent";
}
