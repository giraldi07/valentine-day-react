import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface HeartSpreadProps {
  show: boolean;
}

const HeartSpread: React.FC<HeartSpreadProps> = ({ show }) => {
  // Jumlah hati yang lebih banyak
  const hearts = Array.from({ length: 250 }, (_, i) => i);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={
            show
              ? {
                  opacity: [0, 1, 0], // Muncul dan menghilang
                  scale: [0, 1, 0.5], // Membesar lalu mengecil
                  x: (Math.random() - 0.5) * window.innerWidth * 1.5, // Posisi horizontal acak
                  y: -window.innerHeight * 1.5, // Bergerak ke atas
                  rotate: Math.random() * 360, // Rotasi acak
                }
              : {}
          }
          transition={{
            duration: 2 + Math.random() * 2, // Durasi acak antara 2-4 detik
            delay: i * 0.1, // Penundaan untuk efek bertahap
            ease: "easeOut",
          }}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`, // Posisi horizontal acak
            top: `${Math.random() * 100}%`, // Posisi vertikal acak
          }}
        >
          <Heart
            className="w-8 h-8 text-pink-500"
            fill="#ec4899"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default HeartSpread;