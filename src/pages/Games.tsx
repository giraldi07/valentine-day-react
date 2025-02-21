import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import GamesData from '../data/pages-data/features/games'; // Impor data dari file terpisah
import clickSound from '../assets/audio/tap.mp3'; // Import file suara

function Games() {
  const navigate = useNavigate();

  // Fungsi untuk memutar suara klik
  const playClickSound = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  const handleGameSelection = (gameId: string) => {
    playClickSound(); // Memutar suara saat tombol kembali ditekan
    navigate(`/games/${gameId}`); // Navigasi ke halaman game yang dipilih
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-radial from-gray-50 via-gray-300 to-gray-500 p-5 md:p-6 flex flex-col items-center pt-12 md:pt-20">
        {/* Konten halaman */}
        <div className="relative z-10 max-w-4xl w-full text-center">
          {/* Judul halaman */}
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`text-4xl md:text-5xl font-bold ${GamesData.pageTitle.color} mb-6 md:mb-10`}
            style={{ 
              fontFamily: GamesData.pageTitle.fontFamily,
              textShadow: "2px 2px 0px black, -2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black"
            }}
          >
            {GamesData.pageTitle.text}
          </motion.h2>


          {/* Daftar game */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
          >
            {GamesData.games.map((game) => (
              <div
                key={game.id}
                className="bg-white rounded-2xl shadow-lg p-4 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => handleGameSelection(game.id)}
              >
                {/* Gambar game */}
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-40 md:h-48 object-cover rounded-lg"
                />
                {/* Nama game */}
                <h3
                  className="text-xl font-semibold text-red-600 mt-4"
                  style={{ fontFamily: 'Lobster Two, cursive' }}
                >
                  {game.name}
                </h3>
              </div>
            ))}
          </motion.div>

          {/* Tombol kembali */}
          <button
            onClick={() => {
              navigate('/features');
              playClickSound();
            }}
            className={`mt-8 md:mt-12 px-6 py-2 ${GamesData.backButton.color} text-white rounded-lg ${GamesData.backButton.hoverColor} transition-colors`}
          >
            {GamesData.backButton.text}
          </button>
        </div>
      </div>
    </PageTransition>
  );
}

export default Games;