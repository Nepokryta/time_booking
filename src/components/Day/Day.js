import PropTypes from 'prop-types';
import getDateName from '../../helpers/getDateName';

import './Day.sass';

function Day({ date, time }) {
  const nameDate = getDateName(date);
  const classNameForWeekDay = (nameDate.weekDayShort === 'Sat' || nameDate.weekDayShort === 'Sun') 
    ? 'week_day-off' : 'week_day';
  
  const timeSlots = time.map((item) => {
    return <div key={item} className="time_slot">{item.slice(0, -3)}</div>;
  });

  return (
    <div className="day">
      <div className="day_name">
        <div className="month_day">{`${nameDate.monthName} ${nameDate.monthDay}`}</div>
        <div className="border" />
        <div className={classNameForWeekDay}>{nameDate.weekDayShort}</div>
      </div>
      {timeSlots.length > 0 ? timeSlots : <div className="time_slot time_slot-none"> 一 </div>}
    </div>
  );
}
Day.propTypes = {
  date: PropTypes.string.isRequired,
  time: PropTypes.arrayOf(PropTypes.string).isRequired,
};
    
export default Day;
