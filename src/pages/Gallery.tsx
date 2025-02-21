import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import pinIcon from '../assets/images/icons/pin.svg'; // Import ikon pin
import LeftLineBottom from '../assets/images/crawl-line.svg';
import RightLineBottom from '../assets/images/heart-outline.svg';
import BgAnimImage from '../assets/images/gif/flower.gif';
import clickSound from '../assets/audio/tap.mp3'; // Import file suara
import galleryData from '../data/pages-data/features/gallery'; // Import data gallery

function Gallery() {
  const navigate = useNavigate();
  const [photos] = useState(galleryData.photos); // Menggunakan data dari gallery.ts
  const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; title: string; description: string } | null>(null);

  // Fungsi untuk menampilkan detail gambar
  const openPhotoDetail = (photo: { src: string; title: string; description: string }) => {
    setSelectedPhoto(photo);
  };

  // Fungsi untuk menutup detail gambar
  const closePhotoDetail = () => {
    setSelectedPhoto(null);
  };

  const handleBack = () => {
    const audio = new Audio(clickSound);
    audio.play();
    navigate('/features');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen bg-gradient-to-br from-pink-100 to-red-50 sm:p-6 p-6 overflow-hidden"
    >
      {/* Konten halaman */}
      <div className="max-w-7xl mt-16 mx-auto z-40">
        {/* Tombol Kembali */}
        <button
          onClick={handleBack}
          className="fixed bottom-4 left-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all z-50"
        >
          Back
        </button>

        {/* Background Animasi */}
        <motion.div
          className="fixed inset-0 w-full h-full z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <img
            src={BgAnimImage}
            alt="Background Animation"
            className="w-full h-full object-cover"
          />
          {/* Overlay Semi-Transparan */}
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        </motion.div>

        {/* Gambar Garis Kiri */}
        <div className="absolute h-screen bottom-[-8vw] left-[-18vw] z-0">
          <img 
            src={LeftLineBottom} 
            alt="Left Line" 
            className="w-[80vw] h-auto object-cover -rotate-12"
          />
        </div>

        {/* Gambar Garis Kanan */}
        <div className="absolute bottom-[-10vw] right-[-24vw] z-0">
          <img 
            src={RightLineBottom} 
            alt="Right Line" 
            className="w-[80vw] sm:w-[50vw] h-auto object-cover opacity-45"
          />
        </div>

        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-3xl md:text-4xl font-bold text-red-600 text-center mb-8"
          style={{
            fontFamily: 'Breathing',
          }}
        >
          Our Memories
        </motion.h1>

        {/* Grid Foto */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 lg:gap-16">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden relative cursor-pointer"
              onClick={() => openPhotoDetail(photo)}
            >
              {/* Ikon Pin */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 -translate-y-0 z-10">
                <img src={pinIcon} alt="Pin Icon" className="w-8 h-8" />
              </div>

              {/* Gambar */}
              <motion.img
                src={photo.src}
                alt={photo.title}
                className="w-full h-48 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />

              {/* Judul */}
              <div className="p-4 text-center">
                <p className="font-semibold text-red-600">{photo.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal untuk Detail Gambar */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ y: -50, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 120, damping: 10 }}
            className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 120, damping: 10 }}
              className="bg-white rounded-lg shadow-lg max-w-[90vw] md:max-w-4xl w-full overflow-hidden relative flex flex-col md:flex-row"
            >
              {/* Gambar Modal (Kiri) */}
              <div className="w-full md:w-1/2 h-auto">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Konten Modal (Kanan) */}
              <div className="w-full md:w-1/2 p-4 md:p-6 flex flex-col justify-center">
                {/* Judul Gambar */}
                <h2 className="text-xl md:text-2xl font-bold text-red-600 mb-2 md:mb-4">
                  {selectedPhoto.title}
                </h2>

                {/* Pesan Singkat */}
                <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6">
                  {selectedPhoto.description}
                </p>

                {/* Tombol Close */}
                <button
                  onClick={closePhotoDetail}
                  className="mt-2 md:mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all text-sm md:text-base"
                  style={{ fontFamily: 'Lobster Two, cursive' }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Gallery;