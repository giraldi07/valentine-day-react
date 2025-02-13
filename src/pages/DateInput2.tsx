import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  const navigate = useNavigate();

  const handleInputChange = (value: string) => {
    setCurrentInput(value);
    setFillPercentage((value.length / 10) * 100);
  };

  const handleSubmit = () => {
    if (currentInput === CORRECT_DATE) {
      setShowHearts(true);
      setTimeout(() => {
        navigate('/countdown-page', { 
          state: { date: currentInput },
        });
      }, 2000);
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
      <motion.div
        animate={{ scale: isShaking ? [1, 0.9, 1.1, 0.9, 1] : 1 }}
        className="max-w-6xl mx-auto w-full flex-grow flex flex-col"
      >
        {/* Judul */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 mb-2">
            Masukkan Tanggal Kita Jadian Sayang!
          </h1>
          <p className="text-pink-400 text-sm sm:text-base">
            Format: DD-MM-YYYY
          </p>
        </div>

        {/* Grid Layout untuk Desktop dan Mobile */}
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Card Foto (Sembunyi di Mobile) */}
          <div className="hidden lg:block lg:col-span-1">
            <ValentineCard />
          </div>

          {/* Konten Kanan (Chart Bar, Input Tanggal, Numpad, Submit Button) */}
          <div className="col-span-1 lg:col-span-2 flex flex-col items-center gap-6">
            {/* Chart Bar */}
            <div className="w-20 sm:w-24">
              <HeartBar fillPercentage={fillPercentage} />
            </div>

            {/* Input Tanggal */}
            <div className="w-full max-w-md">
              <input
                type="text"
                value={currentInput}
                readOnly
                className="text-xl sm:text-2xl font-bold text-pink-600 bg-white/50 backdrop-blur-sm rounded-lg py-3 px-4 text-center w-full outline-none shadow-sm"
                placeholder="DD-MM-YYYY"
              />
            </div>

            {/* Numpad */}
            <div className="w-full max-w-md">
              <Numpad
                onDateSubmit={() => {}}
                onInputChange={handleInputChange}
                currentInput={currentInput}
              />
            </div>

            {/* Submit Button */}
            <div className="w-full max-w-md flex justify-center pt-2">
              <SubmitButton
                isEnabled={currentInput.length === 10}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Heart Spread Animation */}
      <HeartSpread show={showHearts} />
    </div>
  );
};

export default DateInput2;