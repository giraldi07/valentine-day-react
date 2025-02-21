import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { Heart } from 'lucide-react';
import BgAnimImage2 from '../assets/images/gif/flower.gif';
import catAnimation from '../assets/lottie-animations/cat.json';
import FrameSlide from '../components/new-comp/FrameSlide';
import Frame2Left from '../assets/images/frame2-left.svg'; // Import frame kiri
import Frame2Right from '../assets/images/frame2-right.svg';
import TimeCard from "../components/new-comp/TimeCard";

import clickSound from '../assets/audio/tap.mp3'; // Import file suara

// **Preload audio**
const audio = new Audio(clickSound);

const DaysOfLove: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const startDate = location.state?.date || "10-02-2025"; // Default jika tidak ada state
  const [showCard, setShowCard] = useState(true);

  const [selectedDate] = useState(startDate);

  // Konversi string tanggal ke objek Date
  const [day, month, year] = selectedDate.split("-").map(Number);
  const startDateObj = new Date(year, month - 1, day);

  // Hitung selisih waktu sejak tanggal yang dipilih
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - startDateObj.getTime()) / 1000);
  const time = {
    days: Math.floor(diffInSeconds / (60 * 60 * 24)),
    hours: Math.floor((diffInSeconds % (60 * 60 * 24)) / (60 * 60)),
    minutes: Math.floor((diffInSeconds % (60 * 60)) / 60),
    seconds: diffInSeconds % 60,
  };

  useEffect(() => {
    // Preload audio agar tidak ada delay
    audio.load();
  }, []);

  // Fungsi efek suara klik
  const playClickSound = () => {
    audio.currentTime = 0; // Restart audio setiap kali tombol diklik
    audio.play();
  };

  return (
    <FrameSlide direction="down" duration={1} perspective={1500}>
      <div className="min-h-screen bg-gradient-radial from-pink-200 via-pink-100 to-gray-400 p-4 sm:p-6 md:p-8 flex flex-col relative">

        {/* Gambar Latar Belakang */}
        <img
          src={BgAnimImage2}
          alt="Background Animation"
          className="w-full h-full object-cover absolute top-0 left-0 z-0"
        />

        {/* Frame SVG - Pojok Kiri Bawah */}
        <img
          src={Frame2Left}
          alt="Frame Left"
          className="fixed left-0 bottom-0 w-[50vw] z-10"
        />

        {/* Frame SVG - Pojok Kanan Atas */}
        <img
          src={Frame2Right}
          alt="Frame Right"
          className="fixed right-0 top-0 w-[50vw] z-10"
        />

        {/* Konten Halaman */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto p-10 md:p-12 lg:p-2 w-full flex-grow flex flex-col z-50 h-screen overflow-y-auto"
        >

          <div className="max-w-3xl mx-auto w-full flex-grow flex flex-col items-center justify-center py-2 md:py-8 z-30">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center mb-8 sm:mb-10"
              style={{ fontFamily: 'Breathing' }}
            >
              <motion.h1
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-3xl md:text-4xl font-bold text-white mb-0 text-center relative z-30"
                  style={{
                      fontFamily: 'Breathing',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)', // Menambahkan efek bayangan untuk dimensi
                      letterSpacing: '0.1em', // Mengatur jarak antar huruf
                  }}
              >
                  Days Of Love
              </motion.h1>
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" fill="#ec4899" />
                <span className="text-base mt-4 sm:text-lg text-pink-500" style={{ fontFamily: 'Montserrat, sans-serif', }}>
                  Our journey together
                </span>
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" fill="#ec4899" />
              </div>
            </motion.div>

            {/* Animasi Lottie */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2 }}
                className="w-full mb-[-10vw] mt-[-24vw] md:mt-[-8vw] max-w-[80%] sm:max-w-[60%] md:max-w-[50%] lg:max-w-[40%]"
            >
              <Lottie
                  animationData={catAnimation}
                  className="w-full max-h-[200px] sm:max-h-[250px] md:max-h-[300px] h-auto"
                />
            </motion.div>

            <AnimatePresence mode="wait">
              {showCard && (
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 3 }}
                  className="w-full mb-2"
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
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playClickSound();
                setShowCard(false); // Sembunyikan kartu terlebih dahulu
                setTimeout(() => {
                  navigate('/features', { state: { date: startDate } }); // Pindah halaman setelah animasi selesai
                }, 1500); // Sesuaikan dengan durasi animasi exit
              }}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-red-500 text-white font-medium sm:font-semibold text-base sm:text-lg rounded-lg shadow-md hover:bg-orange-700 transition-all duration-300 w-fit z-40"
              style={{ fontFamily: 'Lobster Two, cursive' }}
            >
              Explore Features
            </motion.button>

          </div>
        </motion.div>
      </div>
    </FrameSlide>
  );
};

export default DaysOfLove;
