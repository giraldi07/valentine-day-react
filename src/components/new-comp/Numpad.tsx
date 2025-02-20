import React, { useRef } from "react";
import { motion } from "framer-motion";
import type { NumpadProps } from "../../types/index";
import soundClick from "../../assets/audio/tap.mp3";

const Numpad: React.FC<NumpadProps> = ({ onDateSubmit, onInputChange, currentInput }) => {
  const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "0", "⌫"];

  // Ref untuk audio
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleClick = (value: string) => {
    // Putar suara tanpa blocking eksekusi lain
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    requestAnimationFrame(() => {
      if (value === "⌫") {
        onInputChange(currentInput.slice(0, -1));
      } else {
        if (currentInput.length < 10) {
          const newInput = currentInput + value;
          onInputChange(newInput);

          if (newInput.length === 10) {
            onDateSubmit(newInput);
          }
        }
      }
    });
  };

  return (
    <div className="relative w-full grid grid-cols-3 p-3 gap-3 max-w-xs mx-auto h-[280px] bg-gray-200 rounded-xl shadow-lg overflow-hidden">
      {/* Audio untuk efek suara */}
      <audio ref={audioRef} src={soundClick} preload="auto"></audio>

      {buttons.map((btn) => (
        <motion.button
          key={btn}
          whileHover={{ scale: 1.03 }} // Hover lebih responsif
          whileTap={{ scale: 0.95 }} // Tap lebih cepat
          transition={{ duration: 0.05, ease: "easeOut" }} // Animasi tap lebih instan
          className={`
            w-full h-14 sm:h-14 md:h-14 lg:h-14 rounded-md font-semibold
            text-[clamp(0.9rem,2vw,1.3rem)] sm:text-lg 
            ${btn === "-" ? "bg-red-200 text-pink-700" : "bg-white text-pink-600"}
            shadow hover:shadow-md transition-all duration-100
            active:bg-pink-100
          `}
          onClick={() => handleClick(btn)}
        >
          {btn}
        </motion.button>
      ))}
    </div>
  );
};

export default Numpad;
