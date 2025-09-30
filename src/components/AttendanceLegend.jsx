import { getStatusColor } from "../utils/attendanceUtils";

const STATUSES = ["Present", "On Time", "Late", "Absent", "No Class"];

export default function AttendanceLegend() {
  return (
    <div className="p-4 bg-white shadow rounded-lg border mt-4">
      <h4 className="font-semibold mb-2">Attendance Legend</h4>
      <div className="flex flex-wrap gap-3">
        {STATUSES.map((status) => (
          <div
            key={status}
            className={`flex items-center px-2 py-1 rounded ${getStatusColor(status)}`}
          >
            <span className="w-3 h-3 rounded-full bg-current mr-2"></span>
            <span className="text-sm">{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
