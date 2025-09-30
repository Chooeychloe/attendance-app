import { WEEK_DAYS, ALL_DAYS_OPTION } from "../utils/constants";

export default function DaySelector({ selectedDay, onChange }) {
  return (
    <div>
      <label htmlFor="day" className="mr-3 font-medium">
        Filter Day:
      </label>
      <select
        id="day"
        className="border px-3 py-2 rounded"
        value={selectedDay}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value={ALL_DAYS_OPTION}>{ALL_DAYS_OPTION}</option>
        {WEEK_DAYS.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
    </div>
  );
}
