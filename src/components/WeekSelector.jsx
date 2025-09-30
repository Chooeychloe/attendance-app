import { formatDate } from "../utils/dateUtils";

export default function WeekSelector({ weeks, selectedWeek, onChange }) {
  return (
    <div>
      <label htmlFor="week" className="mr-3 font-medium">
        Select Week:
      </label>
      <select
        id="week"
        className="border px-3 py-2 rounded"
        value={selectedWeek}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {weeks.map((w) => (
          <option key={w.week} value={w.week}>
            Week {w.week} (
            {formatDate(w.start, { month: "short", day: "numeric", year: "numeric" })} -{" "}
            {formatDate(w.end, { month: "short", day: "numeric", year: "numeric" })}
            )
          </option>
        ))}
      </select>
    </div>
  );
}
