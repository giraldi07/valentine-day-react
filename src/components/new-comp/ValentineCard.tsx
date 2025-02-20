import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ImagePage2 from '../../assets/images/upload-foto/sweetlove.jpg';

const ValentineCard: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Kartu Valentine */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-xs mx-auto h-[280px] bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Bagian Gambar */}
        <div className="relative h-full" onClick={() => setIsModalOpen(true)}>
          <img
            src={ImagePage2}
            alt="Valentine"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pink-500/50 to-transparent" />
        </div>

        {/* Konten (Muncul saat Hover) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 p-4 text-center bg-white/90 backdrop-blur-sm"
        >
          <h3 className="text-md md:text-lg font-semibold text-pink-600 mb-1">
            Our Love Story
          </h3>
          <p className="text-[13px] text-gray-600">
            Every moment with you is a beautiful page in our story. Let's continue writing our journey together.
          </p>
        </motion.div>
      </motion.div>

      {/* Modal untuk Gambar */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <div className="relative w-[90%] max-w-lg p-2">
              <motion.img
                src={ImagePage2}
                alt="Valentine"
                className="w-full h-auto max-h-[80vh] rounded-lg shadow-lg"
              />
              <button
                className="absolute top-3 right-3 bg-red-600 text-white p-2 rounded-full"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ValentineCard;