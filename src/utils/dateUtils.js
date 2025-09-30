import { holidays } from "../data/holidays";

export function generateWeeks(startDate, endDate) {
    const weeks = [];
    const end = new Date(endDate);
    let current = new Date(startDate);

    // Reset to start of day
    current.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    let weekIndex = 1;

    while (current <= end) {
        const weekStart = new Date(current);
        const weekEnd = new Date(current);

        // Move to Saturday (5 days from Monday)
        weekEnd.setDate(weekEnd.getDate() + 5);

        // If weekEnd exceeds semester end, cap it
        const actualEnd = weekEnd > end ? new Date(end) : weekEnd;

        weeks.push({
            week: weekIndex,
            start: new Date(weekStart),
            end: actualEnd,
        });

        // Move to next Monday
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

// Additional utility for consistent display
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

export const daysOfWeek = [
    { label: "Monday", value: 1 },
    { label: "Tuesday", value: 2 },
    { label: "Wednesday", value: 3 },
    { label: "Thursday", value: 4 },
    { label: "Friday", value: 5 },
    { label: "Saturday", value: 6 },
];