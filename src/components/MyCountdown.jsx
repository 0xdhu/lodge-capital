import { useState, useEffect } from 'react';

export default function Countdown({ timestamp }) {
  const [timeRemaining, setTimeRemaining] = useState();

  useEffect(() => {
    setTimeRemaining(timestamp - Math.floor(Date.now() / 1000))
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
        if((timestamp - Math.floor(Date.now() / 1000))>0){
      setTimeRemaining(timestamp - Math.floor(Date.now() / 1000));}else{
        setTimeRemaining(0);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timestamp]);

  
  const hours = Math.floor((timeRemaining % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((timeRemaining % (60 * 60)) / 60);
  const seconds = timeRemaining % 60;

  return (
    <div>
       {`${hours} h : ${minutes} m : ${seconds} s`}
    </div>
  );
}