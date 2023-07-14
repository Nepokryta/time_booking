import React from 'react';
import Available from '../../assets/img/nothing-available.jpg';
import './Week.sass';

function NoAvailableWeek() {
  return (
    <div className="available">
      <img alt="available" src={Available} />
      <h1>Oh NO!</h1>
      <h2>No more slots available this week</h2>
    </div>
  );
}

export default NoAvailableWeek;
