import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Numpad from '../components/new-comp/Numpad';
import HeartBar from '../components/new-comp/HeartBar';
import SubmitButton from '../components/new-comp/SubmitButton';
import ValentineCard from '../components/new-comp/ValentineCard';
import HeartSpread from '../components/new-comp/HeartSpread';
import BgAnimImage2 from '../assets/images/gif/flower.gif';
import FrameLeft from '../assets/images/frame-left.svg';
import FrameRight from '../assets/images/frame-right.svg';
import LoveDenyut from '../assets/images/gif/love-denyut.gif';
import wrongSound from '../assets/audio/wrong.mp3';
import successSound from '../assets/audio/success.mp3';
import FrameSlide from '../components/new-comp/FrameSlide';
import clickSound from '../assets/audio/tap.mp3';

const CORRECT_DATE = '17-02-2025';

const DateInput2: React.FC = () => {
  const [currentInput, setCurrentInput] = useState('');
  const [fillPercentage, setFillPercentage] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [isError, setIsError] = useState(false); // State untuk error
  const navigate = useNavigate();

  const wrongAudioRef = useRef(new Audio(wrongSound));
  const successAudioRef = useRef(new Audio(successSound));
  const clickAudioRef = useRef(new Audio(clickSound));

  const handleInputChange = (value: string) => {
    setCurrentInput(value);
    setFillPercentage((value.length / 10) * 100);
  };

  const handleSubmit = () => {
    clickAudioRef.current.play(); // Mainkan suara klik

    if (currentInput === CORRECT_DATE) {
      successAudioRef.current.play(); // Mainkan suara sukses
      setShowHearts(true);

      setTimeout(() => {
        navigate('/days-of-love', {
          state: { date: CORRECT_DATE },
        });
      }, 1500); // Beri jeda agar animasi terlihat sebelum navigasi
    } else {
      setIsShaking(true);
      setIsError(true); // Set state error ke true
      wrongAudioRef.current.play(); // Mainkan suara salah
      setFillPercentage(0);

      setTimeout(() => {
        setIsShaking(false);
        setIsError(false); // Set state error ke false setelah animasi selesai
        setCurrentInput('');
      }, 1000);
    }
  };

  return (
    <FrameSlide direction="down" duration={1} perspective={1500}>
      <div className={`min-h-screen w-full bg-gradient-radial from-gray-50 via-gray-300 to-gray-500 p-4 sm:p-6 md:p-8 flex flex-col ${isError ? 'error-effect' : ''}`}>
        {/* Animasi Love Denyut */}
        <img src={LoveDenyut} alt="Love Denyut" className="absolute z-0 opacity-50 blur-md w-[40vw]" />
        <img src={FrameLeft} alt="Frame Left" className="fixed left-[-10vw] bottom-[-20vw] w-[50vw] z-50 pointer-events-none" />
        <img src={FrameRight} alt="Frame Right" className="fixed right-[-10vw] top-[-20vw] w-[50vw] z-50 pointer-events-none" />

        {/* Animasi Bunga */}
        <motion.img
          src={BgAnimImage2}
          alt="Background Animation"
          className="fixed inset-0 w-full h-full object-cover z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />

        {/* Overlay Semi-Transparan */}
        <div className="fixed inset-0 bg-black bg-opacity-10 z-0"></div>

        {/* Konten Utama */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            scale: isShaking ? [1, 0.98, 1.02, 0.98, 1] : 1, // Efek getar yang halus
            x: isShaking ? [-5, 5, -5, 5, 0] : 0, // Efek getar horizontal
          }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto p-10 md:p-12 lg:p-2 w-full flex-grow flex flex-col z-40 overflow-y-auto overscroll-contain"
        >
          {/* Judul */}
          <div className="text-center mt-0 lg:mt-6 mb-6 sm:mb-8 z-40 relative">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-3xl md:text-4xl font-bold text-white mb-0 text-center relative z-30"
              style={{
                fontFamily: 'Wedges',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                letterSpacing: '0.1em',
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
              className={`text-xl sm:text-2xl font-bold text-pink-600 bg-white/50 backdrop-blur-sm rounded-lg py-3 px-4 text-center w-full ${
                isError ? 'border-2 border-red-500' : ''
              }`}
              placeholder="DD-MM-YYYY"
            />
          </div>

          {/* Baris Horizontal untuk Card Foto, Chart Bar, dan Numpad */}
          <div className="flex flex-col md:flex-row items-center justify-center mt-4 gap-6 md:gap-4 w-full">
            {/* Valentine Card di kiri pada desktop */}
            <div className="w-full lg:w-1/3 order-3 md:order-none flex justify-center lg:justify-end">
              <ValentineCard />
            </div>

            {/* Chart Bar tetap di tengah */}
            <div className="w-20 sm:w-24 order-1 md:order-none lg:w-24 flex justify-center">
              <HeartBar fillPercentage={fillPercentage} />
            </div>

            {/* Numpad di kanan pada desktop */}
            <div className="w-full max-w-sm order-2 md:order-none lg:w-1/3 flex justify-center lg:justify-start">
              <Numpad onDateSubmit={() => {}} onInputChange={handleInputChange} currentInput={currentInput} />
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full max-w-md mx-auto flex justify-center mt-12">
            <SubmitButton isEnabled={currentInput.length === 10} onClick={handleSubmit} />
          </div>
        </motion.div>

        {/* Heart Spread Animation */}
        <HeartSpread show={showHearts} />
      </div>
    </FrameSlide>
  );
};

export default DateInput2;