// data/pages-data/opening.ts
import CloudImageL from '../../assets/images/cloudL.svg';
import CloudImageR from '../../assets/images/cloudR.svg';
import BlinkAnimation from '../../assets/images/gif/blink-blink.gif';
import LoveAnimation from '../../assets/lottie-animations/red-line-love.json';

const OpeningData = {
  // Data untuk judul halaman
  pageTitle: {
    text: "This is For", // Judul halaman
    fontFamily: "League Spartan", // Tipe font judul
    color: "text-gray-800", // Warna judul
  },

  // Data untuk teks efek ketik
  typingEffect: {
    text: "KELLIN QUEEN", // Teks yang akan ditampilkan
    speed: 100, // Kecepatan efek ketik (ms per karakter)
    color: "text-blue-500", // Warna teks
    fontFamily: "League Spartan",
    fontWeight: "bold",
  },

  // Data untuk SlideButton
  slideButton: {
    text: {
      open: "Terbuka!", // Teks saat tombol terbuka
      closed: "---->Slide disini!", // Teks saat tombol tertutup
    },
    className: "text-gray-700 font-semibold px-4 text-sm sm:text-lg transition-opacity duration-300", // Kelas Tailwind untuk gaya teks
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