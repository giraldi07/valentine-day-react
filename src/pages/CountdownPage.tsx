import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Countdown from '../components/Countdown';
import { Heart } from 'lucide-react';

const CountdownPage: React.FC = () => {
  const location = useLocation();
  const date = location.state?.date;

  if (!date) {
    return <Navigate to="/" replace />;
  }

  const [day, month, year] = date.split('-').map(Number);
  const targetDate = new Date(year, month - 1, day);

  return (
    <motion.div
      initial={{ opacity: 0 }} // Animasi masuk
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gradient-to-br from-pink-100 to-red-50 p-4 sm:p-6 md:p-8 flex flex-col"
    >
      <div className="max-w-5xl mx-auto w-full flex-grow flex flex-col items-center justify-center py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pink-600 mb-4">
            Days of Love
          </h1>
          <div className="flex items-center justify-center gap-3">
            <Heart className="w-5 h-5 text-pink-500" fill="#ec4899" />
            <span className="text-lg sm:text-xl text-pink-500">
              Our journey together
            </span>
            <Heart className="w-5 h-5 text-pink-500" fill="#ec4899" />
          </div>
        </motion.div>

        <div className="w-full mb-12">
          <Countdown targetDate={targetDate} />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg sm:text-xl text-pink-600 text-center"
        >
          Every second with you is a treasure ❤️
        </motion.p>
      </div>
    </motion.div>
  );
};

export default CountdownPage;