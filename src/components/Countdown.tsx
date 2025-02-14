import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { CountdownProps } from '../types/index';
import { VALENTINE_DATE } from '../data/valentineday';

const Countdown: React.FC<CountdownProps> = () => {
  const location = useLocation();
  const selectedDate = location.state?.date || '12-02-2024';
  
  const [timeSince, setTimeSince] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [timeUntilValentine, setTimeUntilValentine] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const startDate = new Date(selectedDate.split('-').reverse().join('-'));
    const valentineDate = new Date(VALENTINE_DATE);

    // Hitung selisih waktu berjalan hanya sekali
    const now = new Date().getTime();
    const elapsed = now - startDate.getTime();
    setTimeSince({
      days: Math.floor(elapsed / (1000 * 60 * 60 * 24)),
      hours: Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((elapsed % (1000 * 60)) / 1000)
    });

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const untilValentine = valentineDate.getTime() - now;

      setTimeUntilValentine({
        days: Math.floor(untilValentine / (1000 * 60 * 60 * 24)),
        hours: Math.floor((untilValentine % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((untilValentine % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((untilValentine % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedDate]);

  const renderTimeUnits = (time: { days: number; hours: number; minutes: number; seconds: number }, title: string) => (
    <div className="mb-6">
      <h3 className="text-center text-xl font-semibold text-pink-600 mb-3">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-2xl mx-auto px-4">
        {Object.entries(time).map(([key, value], index) => (
          <div key={key} className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.2 }}
              className="bg-white shadow-lg rounded-xl p-4 w-[80px] sm:w-[100px] md:w-[120px] aspect-square flex flex-col items-center justify-center"
            >
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600">
                {value}
              </span>
              <span className="text-sm text-pink-400 mt-1 capitalize">
                {key}
              </span>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {renderTimeUnits(timeSince, 'Sudah Berjalan Selama')}
      {renderTimeUnits(timeUntilValentine, 'Menuju Hari Valentine')}
    </div>
  );
};

export default Countdown;
