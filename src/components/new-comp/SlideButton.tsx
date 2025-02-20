import React, { useRef, useState, useEffect } from "react";
import { Gift, Heart } from "lucide-react";
import { motion } from "framer-motion";
import OpeningData from "../../data/pages-data/opening";

interface SlideToOpenButtonProps {
  isOpen: boolean;
  onSlideSuccess: () => void;
  onSlideChange: () => void;
}

const SlideToOpenButton: React.FC<SlideToOpenButtonProps> = ({
  isOpen,
  onSlideSuccess,
  onSlideChange,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [buttonX, setButtonX] = useState(0);
  const [maxSlideX, setMaxSlideX] = useState(120); // Lebih pendek
  const [dragX, setDragX] = useState(0);

  useEffect(() => {
    if (sliderRef.current) {
      setMaxSlideX(sliderRef.current.offsetWidth * 0.35); // 35% dari lebar slider
    }
  }, [sliderRef.current?.offsetWidth]);

  const handleDrag = (_: any, info: { point: { x: number } }) => {
    setDragX(info.point.x - sliderRef.current!.getBoundingClientRect().left);
  };

  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    if (sliderRef.current) {
      const sliderWidth = sliderRef.current.offsetWidth;
      const successThreshold = sliderWidth * 0.35;

      if (info.offset.x > successThreshold) {
        onSlideSuccess();
        onSlideChange();
        setButtonX(maxSlideX);
        setTimeout(() => {
          setButtonX(0);
          setDragX(0);
        }, 1000);
      } else {
        setButtonX(0);
        setDragX(0);
      }
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setButtonX(0);
      setDragX(0);
    }
  }, [isOpen]);

  return (
    <div
      ref={sliderRef}
      className="relative w-full z-50 max-w-[250px] sm:max-w-[280px] h-12 sm:h-14 bg-gray-200 rounded-full border-2 shadow-md shadow-black border-orange-600 flex items-center justify-center cursor-pointer overflow-hidden select-none"
    >
      {/* Background merah yang mengikuti slide secara real-time */}
      <motion.div
        className="absolute left-0 h-full bg-red-500 rounded-full"
        style={{ width: dragX }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
      />

      {/* Tombol Slide */}
      <motion.button
        className="absolute left-1 w-10 h-10 sm:w-12 sm:h-12 bg-pink-500 border-2 border-orange-600 rounded-full flex items-center justify-center shadow-md z-10"
        drag="x"
        dragConstraints={{ left: 0, right: maxSlideX }}
        dragElastic={0.2}
        dragMomentum={false}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        animate={{ x: buttonX }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
      >
        {isOpen ? (
          <Gift size={20} color="white" className="sm:w-6 sm:h-6" />
        ) : (
          <Heart size={20} color="white" className="sm:w-6 sm:h-6" />
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
