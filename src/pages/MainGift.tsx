// MainGift.tsx

import { useState, useEffect } from "react"; // Tambahkan useEffect
import { motion } from "framer-motion";
import HTMLFlipBook from "react-pageflip";
import { slides } from "../data/pages-data/main-gift/main-gift"; // Impor data dari file terpisah

export default function MainGift() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [flipbookSize, setFlipbookSize] = useState({ width: 300, height: 400 }); // State untuk ukuran flipbook

  // Fungsi untuk mengatur ukuran flipbook berdasarkan layar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setFlipbookSize({ width: 250, height: 350 }); // Ukuran untuk mobile
      } else {
        setFlipbookSize({ width: 300, height: 400 }); // Ukuran untuk desktop
      }
    };

    handleResize(); // Panggil sekali saat komponen dimuat
    window.addEventListener("resize", handleResize); // Update ukuran saat layar di-resize

    return () => window.removeEventListener("resize", handleResize); // Bersihkan event listener
  }, []);

  const playVideo = () => {
    setIsVideoPlaying(true);
    const videoElement = document.getElementById("giftVideo") as HTMLVideoElement;
    if (videoElement) {
      videoElement.requestFullscreen();
      videoElement.play();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-100 p-4">
      <motion.div 
        className="max-w-2xl w-full bg-white shadow-lg rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <HTMLFlipBook
          width={flipbookSize.width} // Gunakan ukuran dinamis
          height={flipbookSize.height} // Gunakan ukuran dinamis
          size="stretch"
          minWidth={200}
          maxWidth={600}
          minHeight={300}
          maxHeight={800}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          className="flipbook"
          style={{}}
          startPage={0}
          drawShadow={true}
          flippingTime={500}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          clickEventForward={false}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={false}
          disableFlipByClick={false}
        >
          {slides.map((slide, index) => (
            <div key={index} className="flipbook-page flex flex-col items-center p-6 text-center">
              {slide.image && (
                <img
                  src={slide.image}
                  alt="Gift"
                  className="w-full h-64 object-cover rounded-lg"
                />
              )}
              <p className="mt-4 text-lg font-semibold text-gray-700">{slide.text}</p>
              {slide.video && (
                <button onClick={playVideo} className="mt-4">
                  <img
                    src={slide.thumbnail}
                    alt="Play Video"
                    className="w-40 h-24 rounded-lg shadow-lg cursor-pointer"
                  />
                </button>
              )}
            </div>
          ))}
        </HTMLFlipBook>
      </motion.div>
      
      {isVideoPlaying && (
        <video id="giftVideo" src="/videos/special.mp4" className="hidden" controls />
      )}
    </div>
  );
}