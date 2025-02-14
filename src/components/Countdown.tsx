// Countdown.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { CountdownProps } from '../types/index';
import { VALENTINE_DATE } from '../data/valentineday';
import TimeCard from '../components/new-comp/TimeCard'; // Import komponen TimeCard

const Countdown: React.FC<CountdownProps> = () => {
  const location = useLocation();
  const selectedDate = location.state?.date || '12-02-2024';

  const [timeSince, setTimeSince] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [timeUntilValentine, setTimeUntilValentine] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const startDate = new Date(selectedDate.split('-').reverse().join('-'));
    const valentineDate = new Date(VALENTINE_DATE);

    const now = new Date().getTime();
    const elapsed = now - startDate.getTime();
    setTimeSince({
      days: Math.floor(elapsed / (1000 * 60 * 60 * 24)),
      hours: Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((elapsed % (1000 * 60)) / 1000),
    });

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const untilValentine = valentineDate.getTime() - now;

      setTimeUntilValentine({
        days: Math.floor(untilValentine / (1000 * 60 * 60 * 24)),
        hours: Math.floor((untilValentine % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((untilValentine % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((untilValentine % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedDate]);

  return (
    <div className="flex flex-col items-center space-y-8 p-4">
      <TimeCard time={timeSince} title="Sudah Berjalan Selama" style="bg-gray-200 text-gray-800" />
      <TimeCard time={timeUntilValentine} title="Menuju Hari Valentine" style="bg-pink-200 text-pink-800" />
    </div>
  );
};

export default Countdown;