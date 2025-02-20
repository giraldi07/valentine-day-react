// data/pages-data/opening.ts
import CloudImageL from '../../assets/images/cloudL.svg';
import CloudImageR from '../../assets/images/cloudR.svg';
import BlinkAnimation from '../../assets/images/gif/blink-blink.gif';
import LoveAnimation from '../../assets/lottie-animations/red-line-love.json';

const OpeningData = {
  // Data untuk judul halaman
  pageTitle: {
    text: "This is For", // Judul halaman
    fontFamily: "Lobster Two", // Tipe font judul
    color: "white", // Warna judul
    fontWeight: "semi-bold", // Tebal tipisnya text
  },

  // Data untuk teks efek ketik
  typingEffect: {
    text: "Input Nama Disini", // Teks yang akan ditampilkan
    speed: 100, // Kecepatan efek ketik (ms per karakter)
    color: "#769fbb", // Warna teks
    fontFamily: "League Spartan",
    fontWeight: "bold",
    fontSize: 38,
    letterSpacing: "4px",
  },

  // Data untuk SlideButton
  slideButton: {
    text: {
      open: "Terbuka!", // Teks saat tombol terbuka
      closed: "SLIDE", // Teks saat tombol tertutup
    },
    className:
      "absolute inset-0 flex items-center justify-center pointer-events-none text-gray-700 font-semibold text-sm sm:text-base md:text-lg transition-opacity duration-300 pl-2 sm:pl-3 md:pl-4",
  },



  // Data untuk latar belakang
  background: {
    gradient: "bg-gradient-radial from-gray-50 via-gray-300 to-gray-500", // Gradien latar belakang
    overlay: "bg-black bg-opacity-10", // Overlay semi-transparan
  },

  // Data untuk gambar dan animasi
  images: {
    cloudL: CloudImageL, // Path gambar awan kiri
    cloudR: CloudImageR, // Path gambar awan kanan
    bgAnimation: BlinkAnimation, // Path animasi latar belakang
    loveAnimation: LoveAnimation, // Path animasi love
  },
};

export default OpeningData;