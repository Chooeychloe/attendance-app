
function generateWeeks(startDate, endDate) {
  const weeks = [];
  let current = new Date(startDate);

  let weekIndex = 1;
  while (current <= endDate) {
    const weekStart = new Date(current);
    const weekEnd = new Date(current);
    weekEnd.setDate(weekEnd.getDate() + 5); // Monday → Saturday

    weeks.push({
      id: weekIndex,
      label: `Week ${weekIndex} (${weekStart.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })} - ${weekEnd.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })})`,
      start: weekStart,
      end: weekEnd,
    });

    current.setDate(current.getDate() + 7);
    weekIndex++;
  }

  return weeks;
}

export const weeks = generateWeeks(
  new Date(2025, 8, 1), // Sept 1, 2025
  new Date(2026, 1, 7)  // Feb 7, 2026
);

