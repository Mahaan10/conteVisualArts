export default function formattedDate(isoString) {
  if (!isoString) return ""
  return new Date(isoString).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  })
}

export function formattedTime(isoString) {
  if (!isoString) return "";
  return new Date(isoString).toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}