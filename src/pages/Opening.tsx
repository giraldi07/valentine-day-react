import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SlideToOpenButton from '../components/new-comp/SlideButton';
import TypingEffect from '../components/new-comp/TypingEffect';
import Lottie from 'lottie-react';
import CurvedText from '../components/new-comp/CurvedText';
import HeartSpread from '../components/new-comp/HeartSpread';
import { useState } from 'react';
import OpeningData from '../data/pages-data/opening'; // Impor data dari file terpisah

function Opening() {
  const navigate = useNavigate();
  const [showHearts, setShowHearts] = useState(false); // State untuk mengontrol tampilan HeartSpread
  const [isOpen, setIsOpen] = useState(false); // State untuk status tombol slide

  const handleSlideSuccess = () => {
    setShowHearts(true); // Tampilkan efek HeartSpread
    setTimeout(() => {
      navigate('/date-input2'); // Navigasi setelah efek selesai
    }, 2000); // Sesuaikan waktu dengan durasi efek HeartSpread
  };

  const handleSlideChange = () => {
    setIsOpen(!isOpen); // Toggle status tombol open/close
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`h-screen max-w-full mx-auto ${OpeningData.background.gradient} flex flex-col items-center justify-center relative overflow-hidden`}
    >
      {/* Background Animasi */}
      <motion.div
        className="fixed inset-0 w-full h-full z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <img
          src={OpeningData.images.bgAnimation}
          alt="Background Animation"
          className="w-full h-full object-cover"
        />
        {/* Overlay Semi-Transparan */}
        <div className={`absolute inset-0 ${OpeningData.background.overlay}`}></div>
      </motion.div>

      <div className="flex flex-col mb-20 items-center justify-center h-screen z-50 relative">
        {/* Judul */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className={`text-center mt-2 mb-4 md:mb-8 px-4 z-50 ${OpeningData.pageTitle.color}`}
          style={{ fontFamily: OpeningData.pageTitle.fontFamily }}
        >
          <CurvedText text={OpeningData.pageTitle.text} />
        </motion.h1>

        {/* Teks Typing Effect */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className={`text-lg sm:text-2xl md:text-3xl mb-6 sm:mb-8 px-4 text-center w-full max-w-[80%] sm:max-w-[70%] md:max-w-[60%] z-50 ${OpeningData.typingEffect.color}`}
          style={{
            height: '100px',
            fontFamily: OpeningData.typingEffect.fontFamily,
            fontWeight: OpeningData.typingEffect.fontWeight,
          }}
        >
          <TypingEffect
            text={OpeningData.typingEffect.text}
            speed={OpeningData.typingEffect.speed}
            color={OpeningData.typingEffect.color}
            fontFamily={OpeningData.typingEffect.fontFamily}
            fontWeight={OpeningData.typingEffect.fontWeight}
          />
        </motion.div>

        {/* Tombol Slide */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="w-full max-w-[150px] sm:max-w-[200px] md:max-w-[220px] mt-[-10vw] md:mt-[-3vw] px-[-2] md:px-2 z-50"
        >
          <SlideToOpenButton isOpen={isOpen} onSlideSuccess={handleSlideSuccess} onSlideChange={handleSlideChange} />
        </motion.div>
      </div>

      {/* Gambar Line Love L */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.9 }}
        className="z-10"
      >
        <Lottie
          animationData={OpeningData.images.loveAnimation}
          className="absolute top-[-40vw] left-[-50vw] md:top-[-24vw] md:left-[-30vw] w-[150vw] md:w-[90vw] sm:w-[40vw] h-auto object-cover -rotate-45 scale-y-[-1]"
        />
      </motion.div>

      {/* Gambar Line Love R */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2 }}
        className="z-10"
      >
        <Lottie
          animationData={OpeningData.images.loveAnimation}
          className="absolute bottom-[-40vw] right-[-50vw] md:bottom-[-10vw] md:right-[-23vw] lg:bottom-[-24vw] lg:right-[-30vw] w-[150vw] md:w-[90vw] sm:w-[40vw] h-auto object-cover -rotate-45"
        />
      </motion.div>

      {/* Gambar Awan */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-0 left-0 right-0 w-full flex gap-0 z-10"
      >
        <img
          src={OpeningData.images.cloudL}
          alt="CloudL"
          className="w-[130vw] lg:w-1/2 h-auto object-cover"
        />

        <img
          src={OpeningData.images.cloudR}
          alt="CloudR"
          className="w-[130vw] lg:w-1/2 h-auto object-cover scale-x-[-1]"
        />
      </motion.div>

      {/* Heart Spread Animation */}
      <HeartSpread show={showHearts} />
    </motion.div>
  );
}

export default Opening;