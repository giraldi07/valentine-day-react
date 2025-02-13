import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // Tambahkan AnimatePresence
import Numpad from '../components/new-comp/Numpad';
import HeartBar from '../components/new-comp/HeartBar';
import SubmitButton from '../components/new-comp/SubmitButton';
import ValentineCard from '../components/new-comp/ValentineCard';
import HeartSpread from '../components/new-comp/HeartSpread';

const CORRECT_DATE = '14-02-2024';

const DateInput2: React.FC = () => {
  const [currentInput, setCurrentInput] = useState('');
  const [fillPercentage, setFillPercentage] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [isExiting, setIsExiting] = useState(false); // State untuk animasi keluar
  const navigate = useNavigate();

  const handleInputChange = (value: string) => {
    setCurrentInput(value);
    setFillPercentage((value.length / 10) * 100);
  };

  const handleSubmit = () => {
    if (currentInput === CORRECT_DATE) {
      setShowHearts(true);
      setIsExiting(true); // Mulai animasi keluar
      setTimeout(() => {
        navigate('/countdown-page', { 
          state: { date: currentInput },
        });
      }, 3000); // Sesuaikan dengan durasi animasi HeartSpread
    } else {
      setIsShaking(true);
      setFillPercentage(0);
      setTimeout(() => {
        setIsShaking(false);
        setCurrentInput('');
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-red-50 p-4 sm:p-6 md:p-8 flex flex-col">
      <AnimatePresence>
        {!isExiting && ( // Hanya render konten jika tidak sedang keluar
          <motion.div
            key="content"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }} // Animasi keluar
            animate={{ scale: isShaking ? [1, 0.9, 1.1, 0.9, 1] : 1 }}
            className="max-w-6xl mx-auto w-full flex-grow flex flex-col"
          >
            {/* Judul */}
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 mb-2">
                Tanggal jadian kita?
              </h1>
              <p className="text-pink-400 text-sm sm:text-base">
                Format: DD-MM-YYYY
              </p>
            </div>

            {/* Input Tanggal */}
            <div className="w-full max-w-md mx-auto mb-6">
              <input
                type="text"
                value={currentInput}
                readOnly
                className="text-xl sm:text-2xl font-bold text-pink-600 bg-white/50 backdrop-blur-sm rounded-lg py-3 px-4 text-center w-full outline-none shadow-sm"
                placeholder="DD-MM-YYYY"
              />
            </div>

            {/* Baris Horizontal untuk Card Foto, Chart Bar, dan Numpad */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 mb-6">
              {/* Card Foto */}
              <div className="hidden lg:block">
                <ValentineCard />
              </div>

              {/* Chart Bar */}
              <div className="w-20 sm:w-24">
                <HeartBar fillPercentage={fillPercentage} />
              </div>

              {/* Numpad */}
              <div className="w-full max-w-md">
                <Numpad
                  onDateSubmit={() => {}}
                  onInputChange={handleInputChange}
                  currentInput={currentInput}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="w-full max-w-md mx-auto flex justify-center">
              <SubmitButton
                isEnabled={currentInput.length === 10}
                onClick={handleSubmit}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Heart Spread Animation */}
      <HeartSpread show={showHearts} />
    </div>
  );
};

export default DateInput2;