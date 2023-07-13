import React, {
  useEffect, useMemo, useState 
} from 'react';

import Header from './components/Header/Header';
import Week from './components/Week/Week';

import Loading from './assets/img/waiting.gif';
import Footer from './components/Footer/Footer';

function App() {
  const [weekData, setWeekData] = useState(null);
  const [errorData, setErrorData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.npoint.io/695f083b025fc7c7c739');
        const data = await response.json();
        setWeekData(data);
      } catch (error) {
        console.log('Error', error);
        setErrorData(true);
      }
    };
    fetchData();
  }, []);

  const filterWeekData = useMemo(() => {
    if (!weekData?.length) {
      return [];
    }
    const weekDataToReturn = JSON.parse(JSON.stringify(weekData));
  
    const today = new Date();
    // const today = new Date('July 13, 2023 10:24:00');
    const todayDate = `${today.getFullYear()}-${(today.getMonth() + 1) < 10 
      ? `0${today.getMonth() + 1}` : (today.getMonth() + 1)}-${today.getDate() < 10 
      ? `0${today.getDate()}` : today.getDate()}`;

    const timeNow = today.toTimeString().split(' ')[0];

    for (let i = 0; i < weekDataToReturn.length; i += 1) {
      const currentWeek = weekDataToReturn[i];

      for (let j = 0; j < currentWeek.length; j += 1) {
        const currentDay = currentWeek[j];
        if (currentDay.date === todayDate) {
          currentDay.time = currentDay.time.filter((item) => item >= timeNow);
          setActiveIndex(i);
        }
        if (currentDay.date < todayDate) {
          currentDay.time = [];
        }
      }
        
      //   for (let j = 0; j < currentWeek.length; j += 1) {
      //     console.log(currentWeek[j], 'currentWeek');
      //     const currentDay = currentWeek[j];

      //     if (currentDay.date <= todayDate) {
      //       currentDay.time = [];
      //       //   continue;
      //     }
  
    //     // currentDay.time = currentDay.time.filter((item) => item >= timeNow);
    //   }
    }
    return weekDataToReturn;
  }, [weekData]);

  const showPrevWeek = () => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
      setIsLoading(false);
    }, 300);
  };

  const showNextWeek = () => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex >= weekData.length - 1 ? weekData.length - 1 : prevIndex + 1));
      setIsLoading(false);
    }, 300);
  };

  if (!weekData) {
    return <img alt="Loading" src={Loading} className="loading" />;
  }

  if (errorData) {
    return <div>`We&apos;re very sorry for the error.`</div>;
  }

  return (
    <div className="wrapper">
      <Header showNextWeek={showNextWeek} showPrevWeek={showPrevWeek} filterWeekData={filterWeekData[activeIndex]} />
      {isLoading 
        ? (<img alt="Loading" src={Loading} className="loading" />) 
        : (<Week filterWeekData={filterWeekData[activeIndex]} />)}
      <Footer />
    </div>
  );
}

export default App;
