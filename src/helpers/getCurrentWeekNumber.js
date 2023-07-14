export default function getCurrentWeekNumber() {
  const newDate = new Date();
  newDate.setUTCDate(newDate.getUTCDate() + 4 - (newDate.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(newDate.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((newDate - yearStart) / 86400000) + 1) / 7);

  return weekNo;
}
