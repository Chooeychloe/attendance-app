import { formatDate } from "../utils/dateUtils";

export default function AttendanceTable({ day, logs, holiday }) {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-2">
        {day.toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
        {holiday && (
          <span className="ml-2 text-blue-600 font-medium">• {holiday.name}</span>
        )}
      </h3>
      <table className="w-full border mb-6">
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
          {logs.length > 0 ? (
            logs
              .sort((a, b) => a.faculty.localeCompare(b.faculty))
              .map((entry) => (
                <tr key={`${entry.faculty}-${entry.date}`}>
                  <td className="p-2 border">{entry.faculty}</td>
                  <td className="p-2 border">
                    {formatDate(day, { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="p-2 border">{entry.log?.timeIn || "-"}</td>
                  <td className="p-2 border">{entry.log?.timeOut || "-"}</td>
                  <td
                    className={`p-2 border font-semibold ${
                      entry.status.includes("Holiday")
                        ? "text-blue-600"
                        : entry.status === "On Time"
                        ? "text-green-600"
                        : entry.status === "Late"
                        ? "text-yellow-600"
                        : entry.status === "Absent"
                        ? "text-red-600"
                        : "text-gray-500"
                    }`}
                  >
                    {entry.status}
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td className="p-2 border text-center" colSpan={5}>
                {holiday ? `Holiday: ${holiday.name}` : "No attendance recorded"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
