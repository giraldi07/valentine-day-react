import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { features } from '../data/features';
import PageTransition from '../components/PageTransition';
import Decorations from '../components/Decorations';
import TimeCard from '../components/new-comp/TimeCard';
import BgAnimImage from '../assets/images/gif/blink-blink.gif';
import featuresIcons from '../assets/images/icons/biglove.svg';

const Features: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const startDate = location.state?.date || "10-02-2025"; // Default jika tidak ada state
  const [showFeatures, setShowFeatures] = useState(false);

  const [selectedDate] = useState(startDate);

  const toggleFeatures = () => {
    setShowFeatures(!showFeatures);
  };

  // Konversi string tanggal ke objek Date
  const [day, month, year] = startDate.split("-").map(Number);
  const startDateObj = new Date(year, month - 1, day); // Bulan dikurangi 1 karena di JS bulan dimulai dari 0

  // Hitung selisih waktu sejak tanggal jadian
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - startDateObj.getTime()) / 1000);
  const time = {
    days: Math.floor(diffInSeconds / (60 * 60 * 24)),
    hours: Math.floor((diffInSeconds % (60 * 60 * 24)) / (60 * 60)),
    minutes: Math.floor((diffInSeconds % (60 * 60)) / 60),
    seconds: diffInSeconds % 60,
  };


  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-radial from-gray-50 via-gray-300 to-gray-500 p-4">
        <Decorations />

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
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        </motion.div>

        {/* Overlay Blur */}
        {showFeatures && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-20"
            onClick={toggleFeatures}
          />
        )}

        <div className="relative max-w-4xl mx-auto mt-10 pt-8">

          {/* Teks Putih (Utama) */}
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-10 text-center relative z-10"
            style={{
                fontFamily: 'Breathing',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)', // Menambahkan efek bayangan untuk dimensi
                letterSpacing: '0.1em', // Mengatur jarak antar huruf
            }}
          >
              Days Of Love
          </motion.h1>
           

          <div className="flex justify-center z-30 items-center gap-6 md:gap-8 flex-wrap relative">
            {/* Ikon Utama (Love Fill) */}
            <motion.div
              onClick={toggleFeatures}
              className="flex flex-col items-center cursor-pointer z-30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-2 z-30">
                <img
                  src={featuresIcons} // Menggunakan ikon hati dari data
                  alt="Heart Icon"
                  className="w-40 h-40"
                />
              </div>
              <span className="text-red-600 font-medium"></span>
            </motion.div>

            {/* Ikon Fitur */}
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                animate={{
                  scale: showFeatures ? 1 : 0,
                  opacity: showFeatures ? 1 : 0,
                  x: showFeatures ? Math.cos((index * 2 * Math.PI) / features.length) * 120 : 0,
                  y: showFeatures ? Math.sin((index * 2 * Math.PI) / features.length) * 120 : 0,
                }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
                onClick={() => navigate(feature.path)}
                className="flex flex-col items-center cursor-pointer absolute z-30"
              >
                <motion.div
                  whileHover={feature.animation.hover}
                  whileTap={feature.animation.tap}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-lg flex items-center justify-center mb-2">
                    <img
                      src={feature.icon} // Menggunakan path gambar ikon
                      alt={feature.title}
                      className="w-20 h-20 md:w-30 md:h-30"
                    />
                  </div>
                </motion.div>
                <span className="text-red-600 font-medium text-sm" style={{ fontFamily: 'Lobster Two, cursive' }}>
                  {feature.title}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Timer Card */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-4"
            style={{
              fontFamily: 'Lobster Two',
            }}
          >
            <TimeCard 
              time={time} 
              title="Sudah Bersama" 
              style="text-gray-800"
              startDate={selectedDate} // Teruskan tanggal awal ke TimeCard
            />
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
}

export default Features;