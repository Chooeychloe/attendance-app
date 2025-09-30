import { formatLogDate, getStatusColor } from "../utils/attendanceUtils";

export default function AttendanceTable({ day, logs, holiday }) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-2">
        {day.toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </h3>

      {holiday ? (
        <div className="p-4 bg-red-100 text-red-700 rounded">
          Holiday: {holiday}
        </div>
      ) : logs.length === 0 ? (
        <div className="p-4 bg-gray-100 text-gray-600 rounded">
          No attendance records for this day.
        </div>
      ) : (
        <table className="w-full border-collapse border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Faculty</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Time In</th>
              <th className="p-2 border">Time Out</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((entry, idx) => (
              <tr key={idx} className={getStatusColor(entry.status)}>
                <td className="p-2 border">{entry.faculty}</td>
                <td className="p-2 border">{formatLogDate(entry.date)}</td>
                <td className="p-2 border">{entry.timeIn || "-"}</td>
                <td className="p-2 border">{entry.timeOut || "-"}</td>
                <td className="p-2 border font-semibold">{entry.status || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
      )}
    </div>
  );
}
