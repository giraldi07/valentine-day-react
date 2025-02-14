import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SlideToOpenButton from '../components/new-comp/SlideButton'; // Sesuaikan path sesuai struktur proyek Anda
import TypingEffect from '../components/new-comp/TypingEffect';
import ValentineIcons from '../components/new-comp/ValentineIconsAnimation';


function Opening() {
  const navigate = useNavigate();

  // Fungsi yang akan dipanggil ketika tombol berhasil di-slide
  const handleSlideSuccess = () => {
    navigate('/date-input2');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen max-w-full mx-auto bg-gradient-radial from-gray-100 from-30% to-gray-500 flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="mb-8"
      >
        <ValentineIcons />
      </motion.div>
      
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-4xl md:text-6xl font-bold text-red-600 mb-6 text-center"
        style={{ fontFamily: 'Lobster Two, cursive', transform: 'rotate(-5deg)' }} // Menambahkan rotasi
      >
        This is for
      </motion.h1>
      
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-xl md:text-2xl text-red-400 mb-12 p-6 text-center"
      >
        <TypingEffect text="{Masukan Nama Disini}" speed={90} />
      </motion.p>
      
      {/* Ganti tombol dengan komponen SlideToOpenButton */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <SlideToOpenButton onSlideSuccess={handleSlideSuccess} />
      </motion.div>
    </motion.div>
  );
}

export default Opening;