import formatDate from './formatDate';

export default function getDateFromWeek(year, weekNumber, dayOfWeek) {
  const date = new Date(year, 0, 1 + (weekNumber - 1) * 7); // January 1st + 7 days * (week number - 1)
  const day = date.getDay();
  const diff = (dayOfWeek - day + 7) % 7; // Calculate the difference in days to reach the desired day of the week
  date.setDate(date.getDate() + diff);// Set the resulting day of the week
  
  return formatDate(date);
}
