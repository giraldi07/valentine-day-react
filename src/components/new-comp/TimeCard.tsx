import React from "react";
import { motion } from "framer-motion";

interface TimeCardProps {
  time: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  title: string;
  style?: string;
  startDate?: string; // Tambahkan prop untuk tanggal awal
}

const TimeCard: React.FC<TimeCardProps> = ({ time, title, style, startDate }) => {
  // Format tanggal awal (jika ada)
  const formattedDate = startDate
    ? new Date(startDate.split('-').reverse().join('-')).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative bg-white/80 border border-pink-300 shadow-2xl rounded-2xl p-6 sm:p-8 w-fit mx-auto
        ${style} hover:shadow-pink-500/50 transition-all duration-500`}
    >
      {/* Hiasan Heart */}
      <div className="absolute -top-4 -right-4 bg-pink-600 text-white text-xs px-3 py-1 rounded-full shadow-lg">
        💖 Love Timer 💖
      </div>

      {/* Judul */}
      <h3 className="text-center text-2xl sm:text-3xl font-semibold text-pink-700 drop-shadow-md">
        {title}
      </h3>
      {/* Tanggal Awal */}
      {formattedDate && (
        <p className="text-center text-sm sm:text-base text-gray-600 mt-2 italic">
          Sejak {formattedDate} 💕✨
        </p>
      )}

      {/* Grid Waktu */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {Object.entries(time).map(([key, value]) => (
          <div
            key={key}
            className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4 sm:p-5 w-24 sm:w-28
              hover:bg-gray-100 transition-all duration-300"
          >
            <span className="text-3xl sm:text-4xl font-bold text-pink-700">
              {value}
            </span>
            <span className="text-sm sm:text-base text-gray-500 mt-1 capitalize">
              {key}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TimeCard;