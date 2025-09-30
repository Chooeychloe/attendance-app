export function formatLogDate(dateValue) {
  if (typeof dateValue === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
    return dateValue;
  }
  if (dateValue && typeof dateValue.toDate === "function") {
    const d = dateValue.toDate();
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  if (dateValue instanceof Date) {
    return dateValue.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  if (typeof dateValue === "string") {
    const parsed = new Date(dateValue);
    if (!isNaN(parsed)) {
      return parsed.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  }
  return String(dateValue || "-");
}

export function getStatusColor(status) {
  switch (status?.toLowerCase()) {
    case "present":
    case "on time":
      return "bg-green-100 text-green-700";
    case "late":
      return "bg-yellow-100 text-yellow-700";
    case "absent":
      return "bg-red-100 text-red-700";
    case "no class":
      return "bg-gray-100 text-gray-600";
    default:
      return "bg-white text-black";
  }
}
