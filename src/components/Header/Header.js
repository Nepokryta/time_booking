import PropTypes from 'prop-types';
import getDateInfo from '../getDateInfo/getDateInfo';

import './sass/Header.sass';

function Header({ showPrevWeek, showNextWeek, filterWeekData }) {
  const { date: startDate } = filterWeekData[0];
  const { date: finishDate } = filterWeekData[6];
  const starTitle = getDateInfo(startDate);
  const finishTitle = getDateInfo(finishDate);
  
  return (
    <div className="header">
      
      <button onClick={showPrevWeek} className="btn_week prev" type="button">Prev week</button>
      <div className="title_week">
        {starTitle.monthNameLong === finishTitle.monthNameLong 
          ? `${starTitle.monthDay} 一 ${finishTitle.monthDay} ${finishTitle.monthNameLong}`
          : `${starTitle.monthDay} ${starTitle.monthNameLong} 一 ${finishTitle.monthDay} ${finishTitle.monthNameLong}`}
      </div>
      <button onClick={showNextWeek} className="btn_week next" type="button">Next week</button>
    </div>
  );
}

Header.propTypes = {
  filterWeekData: PropTypes.arrayOf(PropTypes.shape({ date: PropTypes.string.isRequired, })).isRequired,
  showPrevWeek: PropTypes.func.isRequired,
  showNextWeek: PropTypes.func.isRequired,
};

export default Header;
