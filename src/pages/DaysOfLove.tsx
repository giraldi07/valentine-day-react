import React from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Countdown from '../components/Countdown';
import { Heart } from 'lucide-react';

const DaysOfLove: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const date = location.state?.date;

  if (!date) {
    return <Navigate to="/" replace />;
  }

  const [day, month, year] = date.split('-').map(Number);
  const targetDate = new Date(year, month - 1, day);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gradient-to-br from-pink-100 to-red-50 p-4 sm:p-6 flex flex-col"
    >
      <div className="max-w-3xl mx-auto w-full flex-grow flex flex-col items-center justify-center py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-8 sm:mb-10"
          style={{
            fontFamily: 'Lobster Two, cursive',
            size: '48px',
          }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-3">
            Days of Love
          </h1>
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" fill="#ec4899" />
            <span className="text-base sm:text-lg text-pink-500">
              Our journey together
            </span>
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" fill="#ec4899" />
          </div>
        </motion.div>

        <div className="w-full mb-8">
          <Countdown targetDate={targetDate} />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="text-base sm:text-lg text-pink-600 text-center mb-5"
        >
          Every second with you is a treasure ❤️
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/features')}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-pink-500 text-white font-medium sm:font-semibold text-base sm:text-lg rounded-lg shadow-md hover:bg-pink-600 transition-all duration-300 w-fit"
        >
          Explore Features
        </motion.button>
      </div>
    </motion.div>
  );
};

export default DaysOfLove;
