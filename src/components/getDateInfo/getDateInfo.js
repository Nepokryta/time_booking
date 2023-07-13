function getDateInfo(date) {
  const dateObj = new Date(date);
  const weekDayShort = dateObj.toLocaleString('en-US', { weekday: 'short' });
  const monthNameLong = dateObj.toLocaleString('en-US', { month: 'long' });
  const monthName = dateObj.toLocaleString('en-US', { month: 'short' });
  const monthDay = dateObj.getDate();
    
  return {
    monthName, weekDayShort, monthNameLong, monthDay 
  };
}

export default getDateInfo;
