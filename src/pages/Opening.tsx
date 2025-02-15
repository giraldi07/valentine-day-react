import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SlideToOpenButton from '../components/new-comp/SlideButton';
import TypingEffect from '../components/new-comp/TypingEffect';
import LineLeftImage from '../assets/images/line-left.svg';
import LineLoveImage from '../assets/images/line-love.svg';
import CloudRImage from '../assets/images/cloudR.svg';
import CloudLImage from '../assets/images/cloudL.svg';

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
      {/* Judul */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-red-600 mb-4 sm:mb-6 text-center px-4 z-50"
        style={{
          fontFamily: 'Lobster Two, cursive',
          transform: 'rotate(-5deg)',
          letterSpacing: '0.01em',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        }}
      >
        This is for
      </motion.h1>

      {/* Teks Typing Effect */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-2xl sm:text-3xl md:text-4xl text-red-400 mb-12 sm:mb-12 px-4 text-center w-full max-w-[90%] z-50"
        style={{ height: '48px' }} // Tetapkan tinggi tetap
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

      {/* Gambar Line Left */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.9 }}
        className="absolute top-[-10vw] sm:top-[-15vw] left-[-5vw] w-[40vw] sm:w-[50vw] h-auto z-30"
      >
        <img
          src={LineLeftImage}
          alt="Line Left"
          className="w-full h-auto object-cover"
        />
      </motion.div>

      {/* Gambar Line Love */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-0 right-0 w-[30vw] sm:w-[25vw] md:w-[20vw] h-auto z-30"
      >
        <img
          src={LineLoveImage}
          alt="Line Love"
          className="w-full h-auto object-cover"
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
          className="w-1/2 min-w-[200px] h-auto object-cover"
        />

        <img
          src={CloudRImage}
          alt="CloudR"
          className="w-1/2 min-w-[200px] h-auto object-cover scale-x-[-1]"
        />
      </motion.div>
    </motion.div>
  );
}

export default Opening;