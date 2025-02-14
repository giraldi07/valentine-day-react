import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import SlideToOpenButton from '../components/new-comp/SlideButton'; // Sesuaikan path sesuai struktur proyek Anda
import TypingEffect from '../components/new-comp/TypingEffect';

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
      className="min-h-screen bg-gradient-radial from-gray-100 from-30% to-gray-500 flex flex-col items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="text-red-500 mb-8"
      >
        <Heart size={80} className="animate-pulse" />
      </motion.div>
      
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-4xl md:text-6xl font-bold text-red-600 mb-6 text-center"
      >
        This is For
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