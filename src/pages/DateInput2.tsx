import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Numpad from '../components/new-comp/Numpad';
import HeartBar from '../components/new-comp/HeartBar';
import SubmitButton from '../components/new-comp/SubmitButton';
import ValentineCard from '../components/new-comp/ValentineCard';
import HeartSpread from '../components/new-comp/HeartSpread';
import BgAnimImage2 from '../assets/images/gif/flower.gif';
import FrameLeft from '../assets/images/frame-left.svg'; // Import frame kiri
import FrameRight from '../assets/images/frame-right.svg'; // Import frame kanan
import LoveDenyut from '../assets/images/gif/love-denyut.gif';

// Import file suara
import wrongSound from '../assets/audio/wrong.mp3';
import successSound from '../assets/audio/success.mp3';
import FrameSlide from '../components/new-comp/FrameSlide';

const CORRECT_DATE = '17-02-2025';

const DateInput2: React.FC = () => {
  const [currentInput, setCurrentInput] = useState('');
  const [fillPercentage, setFillPercentage] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showValentineCard, setShowValentineCard] = useState(false); // State baru untuk mengontrol tampilan ValentineCard
  const navigate = useNavigate();

  const handleInputChange = (value: string) => {
    setCurrentInput(value);
    setFillPercentage((value.length / 10) * 100);
  };

  const handleSubmit = () => {
    if (currentInput === CORRECT_DATE) {
      setShowHearts(true);
      setIsExiting(true);
      new Audio(successSound).play(); // Play success sound
      setTimeout(() => {
        setShowValentineCard(true); // Tampilkan ValentineCard setelah 1 detik
      }, 1000);
    } else {
      setIsShaking(true);
      setIsError(true);
      new Audio(wrongSound).play(); // Play error sound
      setFillPercentage(0);
      setTimeout(() => {
        setIsShaking(false);
        setIsError(false);
        setCurrentInput('');
      }, 1000); // Durasi efek error (1 detik)
    }
  };

  const handleContinue = () => {
    navigate('/days-of-love', { 
      state: { date: CORRECT_DATE }, // Kirim tanggal ke halaman tujuan
    });
  };


  return (
    <FrameSlide direction="down" duration={1} perspective={1500}>

      <div className={`min-h-screen bg-gradient-radial from-gray-50 via-gray-300 to-gray-500 p-4 sm:p-6 md:p-8 flex flex-col ${isError ? 'error-effect' : ''}`}>
        <img
          src={LoveDenyut}
          alt="Love Denyut"
          className="absolute z-0 opacity-50 blur-md w-[40vw]"
        />

        <img
          src={LoveDenyut}
          alt="Love Denyut"
          className="absolute z-0 opacity-50 blur-md w-[40vw] right-[-10vw] bottom-[-10vw]"
        />


        {/* Frame SVG - Pojok Kiri Bawah */}
        <img
          src={FrameLeft}
          alt="Frame Left"
          className="fixed left-[-10vw] bottom-[-20vw] w-[50vw] z-40"
        />

        {/* Frame SVG - Pojok Kanan Atas */}
        <img
          src={FrameRight}
          alt="Frame Right"
          className="fixed right-[-10vw] top-[-20vw] w-[50vw] z-40"
        />

        {/* Background Animasi */}
        <motion.div
          className="fixed inset-0 w-full h-full z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <img
            src={BgAnimImage2}
            alt="Background Animation"
            className="w-full h-full object-cover"
          />
          {/* Overlay Semi-Transparan */}
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        </motion.div>

        <AnimatePresence>
          {!isExiting && (
            <motion.div
              key="content"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 1 } }}
              animate={{
                scale: isShaking ? [1, 0.98, 1.02, 0.98, 1] : 1, // Efek getar yang halus
                x: isShaking ? [-5, 5, -5, 5, 0] : 0, // Efek getar horizontal
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }} // Transisi halus
              className="max-w-4xl mx-auto p-10 md:p-12 lg:p-2 w-full flex-grow flex flex-col z-40 h-screen overflow-y-auto"
            >
              {/* Judul */}
              <div className="text-center mt-0 lg:mt-6 mb-6 sm:mb-8 z-40 relative">
                {/* Teks Putih (Utama) */}
                <motion.h1
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-3xl md:text-4xl font-bold text-white mb-0 text-center relative z-30"
                  style={{
                    fontFamily: 'Wedges',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)', // Menambahkan efek bayangan untuk dimensi
                    letterSpacing: '0.1em', // Mengatur jarak antar huruf
                  }}
                >
                  Tanggal Jadian Kita?
                </motion.h1>
                <p className="text-gray-600 font-bold italic">Masukan data 17-02-2025</p>
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
                <div className="w-full max-w-sm">
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

        {/* Overlay dan ValentineCard */}
        <AnimatePresence>
          {showValentineCard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/40 rounded-lg p-6 max-w-[90%] md:max-w-sm w-full"
              >
                <ValentineCard />
                <button
                  onClick={handleContinue}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                  style={{ fontFamily: 'Lobster Two, cursive' }}
                >
                  Continue
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </FrameSlide>


  );
};

export default DateInput2;