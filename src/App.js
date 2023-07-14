import React, { useEffect, useState } from 'react';
import getCurrentWeekNumber from './helpers/getCurrentWeekNumber';

import Header from './components/Header/Header';
import Week from './components/Week/Week';
import Loading from './assets/img/waiting.gif';
import Footer from './components/Footer/Footer';
import formatDate from './helpers/formatDate';
import fillEmptyData from './helpers/fillEmptyData';

function App() {
  const [currWeek, setCurrWeek] = useState(null);
  const [currWeekData, setCurrWeekData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCurrWeek(getCurrentWeekNumber());
  }, []);

  const filterWeekData = (data, selectedWeek) => {
    if (!data.days.length) {
      return { days: [] };
    }
    const realCurrWeek = getCurrentWeekNumber();

    if (realCurrWeek > selectedWeek) {
      return {
        ...data,
        days: data.days.map((d) => ({
          date: d.date,
          time: [],
        }))
      };
    } if (realCurrWeek < selectedWeek) {
      return data;
    }
    const weekDataToReturn = JSON.parse(JSON.stringify(data));
    
    // const today = new Date();
    const today = new Date('July 12, 2023 10:24:00');
    const timeNow = today.toTimeString().split(' ')[0];
    const todayDate = formatDate(today);

    for (let i = 0; i < weekDataToReturn.days.length; i += 1) {
      const currentDay = weekDataToReturn.days[i];
      if (currentDay.date === todayDate) {
        currentDay.time = currentDay.time.filter((item) => item >= timeNow);
      }
      if (currentDay.date < todayDate) {
        currentDay.time = [];
      }
    }
      
    return weekDataToReturn;
  };

  useEffect(() => {
    if (!currWeek) {
      return;
    }
    setIsLoading(true);
    const fetchData = async () => {
      let data;
      try {
        const response = await fetch(`http://localhost:3001/weeks/${currWeek}`);
        data = await response.json();
        if (!response.ok) {
          throw new Error(`Error:${response.status}`);
        }
      } catch (error) {
        data = fillEmptyData(2023, currWeek);
      } finally {
        setIsLoading(false);
        setCurrWeekData(filterWeekData(data, currWeek));
      }
    };
    fetchData();
  }, [currWeek]);

  const showPrevWeek = () => {
    setCurrWeek((prevIndex) => (prevIndex - 1));
  };
  //   console.log(currWeek);
  const showNextWeek = () => {
    setCurrWeek((prevIndex) => (prevIndex + 1));
  };

  return (
    (currWeekData !== null) ? (
      <div className="wrapper">
        <Header
          showNextWeek={showNextWeek} 
          showPrevWeek={showPrevWeek}
          daysCurrWeekData={currWeekData.days}
        />
        <Week daysCurrWeekData={currWeekData.days} key={currWeekData.id} />
        {isLoading && (
          <div className="spinner-container">
            <img alt="Loading" src={Loading} className="loading" />
            <div className="overlay" />
          </div>
        )}
        <Footer />
      </div>
    ) : <img alt="Loading" src={Loading} className="loading" />
  );
}

export default App;
