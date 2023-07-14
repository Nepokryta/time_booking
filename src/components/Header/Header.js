import PropTypes from 'prop-types';
import getDateName from '../../helpers/getDateName';

import './Header.sass';

function Header({ showPrevWeek, showNextWeek, daysCurrWeekData }) {
  const { date: startDate } = daysCurrWeekData[0];
  const { date: finishDate } = daysCurrWeekData[6];
  const starTitle = getDateName(startDate);
  const finishTitle = getDateName(finishDate);

  return (
    <div className="header">
      <button onClick={showPrevWeek} className="btn_week prev" type="button">Prev week</button>
      <div className="title_week">
        {starTitle.monthNameLong === finishTitle.monthNameLong 
          ? `${starTitle.monthDay} 一 ${finishTitle.monthDay} ${finishTitle.monthNameLong}`
          : `${starTitle.monthDay} ${starTitle.monthNameLong} 一 ${finishTitle.monthDay} 
          ${finishTitle.monthNameLong}`}
      </div>
      <button onClick={showNextWeek} className="btn_week next" type="button">Next week</button>
    </div>
  );
}

Header.propTypes = {
  daysCurrWeekData: PropTypes.arrayOf(PropTypes.shape({ date: PropTypes.string.isRequired, })).isRequired,
  showPrevWeek: PropTypes.func.isRequired,
  showNextWeek: PropTypes.func.isRequired,
};

export default Header;
