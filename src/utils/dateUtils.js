import { holidays } from "../data/holidays";

export function generateWeeks(startDate, endDate) {
    const weeks = [];
    const end = new Date(endDate);
    let current = new Date(startDate);

    current.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    let weekIndex = 1;

    while (current <= end) {
        const weekStart = new Date(current);
        const weekEnd = new Date(current);

        weekEnd.setDate(weekEnd.getDate() + 5);

        const actualEnd = weekEnd > end ? new Date(end) : weekEnd;

        weeks.push({
            week: weekIndex,
            start: new Date(weekStart),
            end: actualEnd,
        });

        current.setDate(current.getDate() + 7);
        weekIndex++;
    }

    return weeks;
}

export function formatISO(date) {
    if (!(date instanceof Date) || isNaN(date)) {
        return 'Invalid Date';
    }
    return date.toISOString().split("T")[0];
}

export function formatDate(date, options = { month: "short", day: "numeric" }) {
    if (!(date instanceof Date) || isNaN(date)) {
        return 'Invalid Date';
    }
    return new Intl.DateTimeFormat("en-US", options).format(date);
}

export function formatDisplayDate(date) {
    return formatDate(date, {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

export function getHoliday(dateISO) {
    return holidays.find((h) => h.date === dateISO) || null;
}

export function getAllHolidays() {
    return holidays;
}

import { addDays } from "date-fns";

export const getWeeks = () => {
    const start = new Date(2025, 8, 1);
    const end = new Date(2026, 1, 7);
    let weeks = [];
    let current = start;
    let week = 1;

    while (current <= end) {
        const weekStart = new Date(current);
        const weekEnd = addDays(weekStart, 5);
        weeks.push({
            label: `Week ${week} (${weekStart.toDateString()} - ${weekEnd.toDateString()})`,
            start: weekStart,
            end: weekEnd,
        });
        current = addDays(weekEnd, 1);
        week++;
    }
    return weeks;
};
export function toDateKey(date) {
  const d = date instanceof Date ? date : new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`; 
}


export const daysOfWeek = [
    { label: "Monday", value: 1 },
    { label: "Tuesday", value: 2 },
    { label: "Wednesday", value: 3 },
    { label: "Thursday", value: 4 },
    { label: "Friday", value: 5 },
    { label: "Saturday", value: 6 },
];