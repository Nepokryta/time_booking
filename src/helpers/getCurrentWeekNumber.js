export default function getCurrentWeekNumber() {
  // Copy date so don't modify original
  const newDate = new Date();
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  newDate.setUTCDate(newDate.getUTCDate() + 4 - (newDate.getUTCDay() || 7));
  // Get first day of year
  const yearStart = new Date(Date.UTC(newDate.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  const weekNo = Math.ceil((((newDate - yearStart) / 86400000) + 1) / 7);
  // Return array of year and week number
  return weekNo;
}
