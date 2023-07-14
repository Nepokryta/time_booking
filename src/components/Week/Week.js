import React from 'react';
import PropTypes from 'prop-types';
import Day from '../Day/Day';
import NoAvailableWeek from './NoAvailableWeek';

import './Week.sass';

function Week({ daysCurrWeekData }) {
  const isAllEmpty = daysCurrWeekData.every((item) => item.time.length === 0);

  if (isAllEmpty) {
    return <NoAvailableWeek />;
  }

  const elements = daysCurrWeekData.map((item) => (
    <Day key={item.date} date={item.date} time={item.time} />
  ));

  return (
    <div className="week">
      {elements}
    </div>
  );
}

Week.propTypes = {
  daysCurrWeekData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Week;
