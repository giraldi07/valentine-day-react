import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SlideToOpenButton from '../components/new-comp/SlideButton';
import TypingEffect from '../components/new-comp/TypingEffect';
import LineLoveImage from '../assets/images/line-love.svg';
import CloudRImage from '../assets/images/cloudR.svg';
import CloudLImage from '../assets/images/cloudL.svg';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import BgAnimImage from '../assets/images/gif/blink-blink.gif';
import CurvedText from '../components/new-comp/CurvedText';

function Opening() {
  const navigate = useNavigate();

  const handleSlideSuccess = () => {
    navigate('/date-input2');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen max-w-full mx-auto bg-gradient-radial from-gray-100 from-30% to-gray-300 flex flex-col items-center justify-center relative overflow-hidden"
    >

      {/* Background Animasi */}
      <motion.div
        className="fixed inset-0 w-full h-full z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <img
          src={BgAnimImage}
          alt="Background Animation"
          className="w-full h-full object-cover"
        />
        {/* Overlay Semi-Transparan */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </motion.div>


      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mb-[-2%] mt-[-14%]"
      >
        <DotLottieReact
          src="/src/assets/lottie-animations/red-line-love.json"
          loop
          autoplay
          className="w-full h-auto"
        />
      </motion.div>

      
      {/* Judul */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center px-4 z-50"
      >
        <CurvedText />
      </motion.h1>

      {/* Teks Typing Effect */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-2xl sm:text-3xl md:text-4xl mb-12 sm:mb-12 px-4 text-center w-full max-w-[90%] z-50"
        style={{ 
          height: '48px',
          fontWeight: 'bold',
          fontFamily: 'League Spartan',
        }}
      >
        <TypingEffect text="{Masukan Nama Disini}" speed={90} />
      </motion.div>

      {/* Tombol Slide */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="w-full max-w-[200px] sm:max-w-[250px] px-2 z-50"
      >
        <SlideToOpenButton onSlideSuccess={handleSlideSuccess} />
      </motion.div>

      {/* Gambar Line Love L */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.9 }}
        className="z-30"
      >
        <img
          src={LineLoveImage}
          alt="Line Love"
          className="absolute top-[-6vw] left-[-2vw] w-[20vw] md:w-[20vw] sm:w-[40vw] h-auto object-cover -rotate-45"
        />
      </motion.div>

      {/* Gambar Line Love R */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2 }}
        className="z-30"
      >
        <img
          src={LineLoveImage}
          alt="Line Love"
          className="absolute top-[-6vw] right-[-2vw] w-[20vw] md:w-[20vw] sm:w-[40vw] h-auto object-cover scale-x-[-1] rotate-45"
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
          src={CloudLImage}
          alt="CloudL"
          className="w-1/2 h-auto object-cover"
        />

        <img
          src={CloudRImage}
          alt="CloudR"
          className="w-1/2 h-auto object-cover scale-x-[-1]"
        />
      </motion.div>


    </motion.div>
  );
}

export default Opening;