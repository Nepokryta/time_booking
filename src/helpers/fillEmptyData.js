import getDateFromWeek from './getDateFromWeek';

export default function fillEmptyData(year, week) {
  const data = {
    id: week,
    days: []
  };
  
  for (let i = 0; i < 7; i += 1) {
    data.days.push({
      date: getDateFromWeek(year, week, i),
      time: []
    });
  }
  
  return data;
} 
