import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { CountdownProps } from '../../types/index';

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = now - targetDate.getTime();

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeCard = ({ value, label }: { value: number; label: string }) => (
    <motion.div
      key={`${label}-${value}`} // Key unik untuk setiap TimeCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center bg-white shadow-lg rounded-xl p-4 w-[80px] sm:w-[100px] md:w-[120px] aspect-square"
    >
      <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600">
        {value}
      </span>
      <span className="text-sm text-pink-400 mt-1">
        {label}
      </span>
    </motion.div>
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-2xl mx-auto px-4">
      <TimeCard value={timeLeft.days} label="Days" />
      <TimeCard value={timeLeft.hours} label="Hours" />
      <TimeCard value={timeLeft.minutes} label="Minutes" />
      <TimeCard value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

export default Countdown;