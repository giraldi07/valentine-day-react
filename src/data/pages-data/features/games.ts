// data/pages-data/features/games.ts
import TekaTekiImage from '../../../assets/images/tts.svg';
import QuizImage from '../../../assets/images/quiz.svg';

const GamesData = {
  // Data untuk judul halaman
  pageTitle: {
    text: "Mini Games", // Judul halaman
    fontFamily: "Breathing", // Tipe font judul
    color: "text-white", // Warna judul
  },

  // Data untuk daftar game
  games: [
    {
      id: "tts", // ID game
      name: "Teka-Teki Silang", // Nama game
      image: TekaTekiImage, // Langsung gunakan variabel
    },
    {
      id: "quiz", // ID game
      name: "Quiz Fun", // Nama game
      image: QuizImage, // Langsung gunakan variabel
    },
  ],

  // Data untuk tombol kembali
  backButton: {
    text: "Kembali ke Features", // Teks tombol kembali
    color: "bg-gray-500", // Warna tombol
    hoverColor: "hover:bg-gray-600", // Warna hover tombol
  },
};

export default GamesData;