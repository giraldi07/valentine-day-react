import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FrameSlideProps {
  children: React.ReactNode; // Konten yang akan di-animasikan
  direction?: "left" | "right" | "up" | "down" | "zoom" | "rotate"; // Arah animasi (opsional, default: "right")
  duration?: number; // Durasi animasi (opsional, default: 0.5)
  perspective?: number; // Jarak perspektif untuk efek 3D (opsional, default: 1000)
}

const FrameSlide: React.FC<FrameSlideProps> = ({
  children,
  direction = "right",
  duration = 0.5,
  perspective = 1000,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  // Variasi animasi berdasarkan arah
  const slideVariants = {
    initial: {
      x: direction === "left" ? "100%" : direction === "right" ? "-100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "-100%" : 0,
      opacity: 0,
      rotateY: direction === "rotate" ? 90 : 0, // Rotasi 3D
      scale: direction === "zoom" ? 0.5 : 1, // Skala untuk efek zoom
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      rotateY: 0, // Kembali ke posisi normal
      scale: 1, // Kembali ke skala normal
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: duration,
      },
    },
    exit: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "-100%" : direction === "down" ? "100%" : 0,
      opacity: 0,
      rotateY: direction === "rotate" ? -90 : 0, // Rotasi 3D saat keluar
      scale: direction === "zoom" ? 0.5 : 1, // Skala untuk efek zoom saat keluar
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: duration,
      },
    },
  };

  // Trigger animasi saat komponen dimuat atau di-unmount
  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="frame-slide"
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1000, // Pastikan animasi berada di atas konten lain
            backgroundColor: "#ffffff", // Warna latar belakang animasi
            perspective: perspective, // Jarak perspektif untuk efek 3D
            transformStyle: "preserve-3d", // Memastikan transformasi 3D
          }}
        >
          <motion.div
            style={{
              width: "100%",
              height: "100%",
              transformOrigin: "center", // Pusat transformasi
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FrameSlide;