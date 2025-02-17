import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import GamesData from '../data/pages-data/features/games'; // Impor data dari file terpisah

function Games() {
  const navigate = useNavigate();

  const handleGameSelection = (gameId: string) => {
    // Navigasi ke halaman game yang dipilih
    navigate(`/games/${gameId}`);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-radial from-gray-50 via-gray-300 to-gray-500 p-5 md:p-6 flex flex-col items-center">
     

        <div className="relative z-10 max-w-4xl w-full pt-2 md:pt-12 text-center">
          {/* Judul halaman */}
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`text-4xl md:text-5xl font-bold ${GamesData.pageTitle.color} mb-4 md:mb-8`}
            style={{ fontFamily: GamesData.pageTitle.fontFamily }}
          >
            {GamesData.pageTitle.text}
          </motion.h2>

          {/* Daftar game */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {GamesData.games.map((game) => (
              <div
                key={game.id}
                className="bg-white rounded-2xl shadow-lg p-4 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => handleGameSelection(game.id)}
              >
                {/* Gunakan game.image sebagai src */}
                <img
                  src={game.image} // Langsung gunakan nilai image
                  alt={game.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
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
            onClick={() => navigate('/features')}
            className={`mt-6 px-6 py-2 ${GamesData.backButton.color} text-white rounded-lg ${GamesData.backButton.hoverColor} transition-colors`}
          >
            {GamesData.backButton.text}
          </button>
        </div>
      </div>
    </PageTransition>
  );
}

export default Games;