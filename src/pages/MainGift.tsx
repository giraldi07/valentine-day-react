import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HTMLFlipBook from "react-pageflip";
import { slides } from "../data/pages-data/main-gift/main-gift"; // Impor data dari file terpisah
import VideoPlayer from "../components/new-comp/VideoPlayer"; // Impor komponen VideoPlayer
import { useNavigate } from "react-router-dom"; // Impor useNavigate untuk navigasi
import { MdCardGiftcard } from "react-icons/md"; // Import ikon hadiah
import backgroundImage from '../assets/images/book-bg.png'; // Sesuaikan path

export default function MainGift() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [flipbookSize, setFlipbookSize] = useState({ width: 300, height: 400 }); // State untuk ukuran flipbook
  const navigate = useNavigate(); // Hook untuk navigasi

  // Cari slide yang memiliki video
  const videoSlide = slides.find((slide) => slide.video);

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-radial from-gray-50 via-gray-300 to-gray-500 p-4 relative overflow-hidden">
      {/* Background halaman */}
      <div 
        className="absolute inset-0 w-full h-screen bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >

      </div>

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
        className="text-3xl md:text-4xl font-bold text-white mb-6 text-center relative z-10"
        style={{
          fontFamily: 'Breathing',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)', // Menambahkan efek bayangan untuk dimensi
          letterSpacing: '0.1em', // Mengatur jarak antar huruf
        }}
      >
        Special For You
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
          <div className="absolute ml-3 mt-10 leading-5 z-0 p-5 text-md font-semibold text-pink-800 text-justify w-[90%] max-w-xs whitespace-pre-line" style={{ fontFamily: "Lobster Two" }}>
            <p>
              "Selamat ulang tahun, sayangku! Hari ini adalah hari spesial untuk merayakan 
              keberadaanmu yang begitu berarti dalam hidupku. Setiap momen bersamamu adalah 
              hadiah terindah yang tak ternilai harganya.
            </p>
            <p className="mt-2">
              Aku bersyukur bisa mengenalmu, mencintaimu, dan tumbuh bersamamu. Setiap tawa, 
              setiap pelukan, dan setiap percakapan kita adalah kenangan manis yang selalu 
              membuatku bahagia.
            </p>
            <p className="mt-2">
              Semoga di hari ulang tahunmu ini, kamu merasa dicintai, dihargai, dan disayangi 
              seperti cara kamu mencintaiku. Aku berjanji akan selalu ada untukmu, dalam suka 
              maupun duka. Selamat ulang tahun, cintaku".
            </p>
          </div>

          {/* Teks Alas buku sebelah kanan */}
          <div className="absolute mt-36 right-0 flex flex-col items-center justify-center text-center z-0 p-5 text-md font-semibold text-pink-800 w-[90%] max-w-xs whitespace-pre-line" style={{ fontFamily: "Lobster Two" }}>
            <h2 className="text-xl">
              "Terimakasih ya sayang udah mau nerima hadiah ini".
            </h2>
            <p className="mt-2 font-semibold opacity-80">
              -- From your sweet heart --
            </p>
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
            startZIndex={0}
            autoSize={true}
            clickEventForward={false}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={false}
            disableFlipByClick={false}
          >
            {/* Cover */}
            <div className="flipbook-cover bg-gradient-to-r from-pink-400 to-red-500 flex flex-col items-center justify-center p-8 text-center relative rounded-lg shadow-lg w-full h-[400px] max-w-sm">
              {/* Nomor Halaman */}
              <span className="absolute bottom-4 right-4 text-sm text-white opacity-80">
                Halaman 0
              </span>

              <div className="flex-grow flex flex-col items-center">
                <h2 className="text-5xl mt-24 font-bold text-white" style={{ fontFamily: "'Lobster Two', cursive" }}>
                  Special Gift
                </h2>
                <p className="mt-10 text-lg text-white" style={{ fontFamily: "'Lobster Two', cursive" }}>
                  For Someone Special
                </p>
                <p className="mt-2 text-sm text-white opacity-80" style={{ fontFamily: "League Sparta" }}>
                  Click or Swipe to flip the pages
                </p>
              </div>
              {/* Ikon hadiah di tengah bawah */}
              <MdCardGiftcard className="text-7xl text-white absolute bottom-4 left-1/2 transform -translate-x-1/2" />
            </div>

            {/* Halaman Isi */}
            {slides.map((slide, index) => (
              <div key={index} className="flipbook-page flex flex-col items-center p-6 text-center relative">
                {/* Nomor Halaman */}
                <span className="absolute bottom-4 right-4 text-sm text-gray-500">
                  Halaman {index + 1}
                </span>

                {slide.image && (
                  <img
                    src={slide.image}
                    alt="Gift"
                    className="w-full h-64 object-cover rounded-lg mb-4" /* Tambahkan margin-bottom */
                  />
                )}
                <p className="mt-4 text-lg font-semibold text-gray-700">{slide.text}</p>
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