import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HTMLFlipBook from "react-pageflip";
import { mainGiftData } from "../data/pages-data/features/main-gift"; // Impor data dari file terpisah
import VideoPlayer from "../components/new-comp/VideoPlayer"; // Impor komponen VideoPlayer
import { useNavigate } from "react-router-dom"; // Impor useNavigate untuk navigasi
import { MdCardGiftcard } from "react-icons/md"; // Import ikon hadiah

export default function MainGift() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [flipbookSize, setFlipbookSize] = useState({ width: 300, height: 400 }); // State untuk ukuran flipbook
  const navigate = useNavigate(); // Hook untuk navigasi

  // Cari slide yang memiliki video
  const videoSlide = mainGiftData.slides.find((slide) => slide.video);

  // Fungsi untuk mengatur ukuran flipbook berdasarkan layar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setFlipbookSize({ width: window.innerWidth * 0.9, height: window.innerHeight * 0.7 }); // Lebih responsif
      } else if (window.innerWidth < 1024) {
        setFlipbookSize({ width: 280, height: 380 }); // Ukuran untuk tablet
      } else {
        setFlipbookSize({ width: 300, height: 400 }); // Ukuran default desktop
      }
    };

    handleResize(); // Jalankan sekali saat komponen dimuat
    window.addEventListener("resize", handleResize); // Tambahkan event listener

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-radial from-gray-50 via-gray-300 to-gray-500 p-4 relative overflow-hidden">
      {/* Background halaman */}
      <div 
        className="absolute inset-0 w-full h-screen bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${mainGiftData.backgroundImage})` }}
      ></div>

      {/* Tombol Back/Kembali */}
      <button
        onClick={() => navigate("/features")} // Navigasi ke halaman /features
        className="fixed bottom-4 left-4 bg-white text-black px-4 py-2 rounded-lg shadow-lg z-50 hover:bg-gray-100 transition-colors"
      >
        Kembali
      </button>

      {/* Teks Judul (Utama) */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-xl md:text-4xl font-bold text-white mb-6 text-center relative z-10"
        style={{
          fontFamily: 'Breathing',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)', // Menambahkan efek bayangan untuk dimensi
          letterSpacing: '0.1em', // Mengatur jarak antar huruf
        }}
      >
        {mainGiftData.title}
      </motion.h1>

      {/* Container untuk Flipbook */}
      <div className="flex items-center justify-center w-full">
        <motion.div 
          className="max-w-2xl w-full bg-white shadow-lg rounded-lg overflow-hidden relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Teks alas buku sebelah kiri */}
          <div
            className="absolute ml-3 mt-10 leading-5 z-0 p-5 text-md font-semibold text-pink-800 text-justify w-[90%] max-w-xs whitespace-pre-line hidden sm:block"
            style={{ fontFamily: mainGiftData.leftNote.fontFamily }}
          >
            <p>{mainGiftData.leftNote.text}</p>
          </div>

          {/* Teks Alas buku sebelah kanan */}
          <div
            className="absolute mt-36 right-3 flex-col items-center justify-center text-center z-0 p-5 text-md font-semibold text-pink-800 w-[90%] max-w-xs whitespace-pre-line hidden sm:block"
            style={{ fontFamily: mainGiftData.rightNote.fontFamily }}
          >
            <h2 className="text-xl">{mainGiftData.rightNote.text}</h2>
            <p className="mt-2 font-semibold opacity-80">{mainGiftData.rightNote.signature}</p>
          </div>

          <HTMLFlipBook
            width={flipbookSize.width} // Gunakan ukuran dinamis
            height={flipbookSize.height} // Gunakan ukuran dinamis
            size="stretch"
            minWidth={200}
            maxWidth={600}
            minHeight={300}
            maxHeight={800}
            maxShadowOpacity={0.8} // Tingkatkan opacity bayangan
            showCover={true}
            mobileScrollSupport={true}
            className="flipbook"
            style={{ zIndex: 100 }}
            startPage={0}
            drawShadow={true} // Pastikan bayangan diaktifkan
            flippingTime={600} // Sesuaikan kecepatan flip
            usePortrait={true}
            startZIndex={100}
            autoSize={true}
            clickEventForward={false}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={false}
            disableFlipByClick={false}
          >
            {/* Cover */}
            <div className={`flipbook-cover ${mainGiftData.cover.backgroundColor} flex flex-col items-center justify-center p-8 text-center relative rounded-lg shadow-lg w-full h-[400px] max-w-sm`}>
              {/* Nomor Halaman */}
              <span className="absolute bottom-4 right-4 text-sm text-white opacity-80">
                Halaman 0
              </span>

              <div className="flex-grow flex flex-col items-center">
                <h2 className="text-5xl mt-24 font-bold text-white" style={{ fontFamily: "'Lobster Two', cursive" }}>
                  {mainGiftData.cover.title}
                </h2>
                <p className="mt-10 text-lg text-white" style={{ fontFamily: "'Lobster Two', cursive" }}>
                  {mainGiftData.cover.subtitle}
                </p>
                <p className="mt-2 text-sm text-white opacity-80" style={{ fontFamily: "League Sparta" }}>
                  {mainGiftData.cover.instruction}
                </p>
              </div>
              {/* Ikon hadiah di tengah bawah */}
              <MdCardGiftcard className="text-7xl text-white absolute bottom-4 left-1/2 transform -translate-x-1/2" />
            </div>

            {/* Halaman Isi */}
            {mainGiftData.slides.map((slide, index) => (
              <div key={index} className="flipbook-page flex flex-col items-center p-6 text-center relative">
                {/* Nomor Halaman */}
                <span className="absolute bottom-4 right-4 text-sm text-gray-500">
                  Halaman {index + 1}
                </span>


                {/* Gunakan kondisi untuk mengganti posisi gambar dan teks setiap halaman */}
                {index % 2 === 0 ? (
                  <>
                    {slide.image && (
                      <img
                        src={slide.image}
                        alt="Gift"
                        className="w-full h-64 object-cover rounded-lg mb-4"
                      />
                    )}
                    <p className="mt-4 text-lg font-semibold text-gray-700">{slide.text}</p>
                  </>
                ) : (
                  <>
                    <p className="mb-4 text-lg font-semibold text-gray-700">{slide.text}</p>
                    {slide.image && (
                      <img
                        src={slide.image}
                        alt="Gift"
                        className="w-full h-64 object-cover rounded-lg mt-4"
                      />
                    )}
                  </>
                )}
                {slide.video && (
                  <button onClick={() => setIsVideoPlaying(true)} className="mt-4">
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
      </div>
      
      {/* Video Player */}
      {isVideoPlaying && videoSlide?.video && (
        <VideoPlayer
          src={videoSlide.video} // Ambil src video dari slide yang sesuai
          onEnded={() => setIsVideoPlaying(false)}
        />
      )}
    </div>
  );
}