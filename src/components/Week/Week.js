import React from 'react';
import PropTypes from 'prop-types';
import Day from '../Day/Day';
import NoAvailableWeek from './NoAvailableWeek';

import './sass/Week.sass';

function Week({ filterWeekData }) {
  const isAllEmpty = filterWeekData.every((item) => item.time.length === 0);

  if (isAllEmpty) {
    return <NoAvailableWeek />;
  }

  const elements = filterWeekData.map((item) => (
    <Day key={item.id} date={item.date} time={item.time} />
  ));

  return (
    <div className="week">
      {elements}
    </div>
  );
}

Week.propTypes = {
  filterWeekData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Week;
