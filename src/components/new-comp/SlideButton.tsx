import React, { useRef } from "react";
import { Gift, Heart } from "lucide-react";
import { motion } from "framer-motion";
import OpeningData from "../../data/pages-data/opening";

interface SlideToOpenButtonProps {
  isOpen: boolean; // Prop untuk menentukan apakah tombol terbuka atau tertutup
  onSlideSuccess: () => void; // Callback saat slide berhasil
  onSlideChange: () => void; // Callback saat status slide berubah
}

const SlideToOpenButton: React.FC<SlideToOpenButtonProps> = ({ isOpen, onSlideSuccess, onSlideChange }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    if (sliderRef.current) {
      const sliderWidth = sliderRef.current.offsetWidth;
      if (info.offset.x > sliderWidth * 0.5) {
        onSlideSuccess(); // Panggil callback saat slide berhasil
        onSlideChange(); // Panggil callback untuk mengubah status isOpen
      }
    }
  };

  return (
    <div
      ref={sliderRef}
      className="relative w-full z-50 max-w-[300px] sm:max-w-md h-14 sm:h-16 bg-gray-200 rounded-full border-2 shadow-md shadow-black border-orange-600 flex items-center justify-center cursor-pointer overflow-hidden select-none"
    >
      {/* Tombol Slide */}
      <motion.button
        className="absolute left-1 w-12 h-12 sm:w-14 sm:h-14 bg-pink-500 border-2 border-orange-600 rounded-full flex items-center justify-center shadow-md"
        drag="x"
        dragConstraints={{ left: 0, right: sliderRef.current ? sliderRef.current.offsetWidth - 60 : 200 }} // Batas drag dinamis
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        animate={{ x: isOpen ? (sliderRef.current ? sliderRef.current.offsetWidth - 60 : 200) : 0 }} // Animasi saat terbuka
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
      >
        {isOpen ? (
          <Gift size={24} color="white" className="sm:w-7 sm:h-7" />
        ) : (
          <Heart size={24} color="white" className="sm:w-7 sm:h-7" />
        )}
      </motion.button>

      {/* Teks */}
      <span className={OpeningData.slideButton.className}>
        {isOpen ? OpeningData.slideButton.text.open : OpeningData.slideButton.text.closed}
      </span>
    </div>
  );
};

export default SlideToOpenButton;