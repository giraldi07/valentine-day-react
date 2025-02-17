import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Decorations from '../components/Decorations';
import tekaTekiImg from '../assets/images/tts.svg';
import quizImg from '../assets/images/quiz.svg';

const games = [
  { id: 'tts', name: 'Teka-Teki Silang', image: tekaTekiImg },
  { id: 'quiz', name: 'Quiz Valentine', image: quizImg },
];

function Games() {
  const navigate = useNavigate();

  const handleGameSelection = (gameId: string) => {
    // Navigasi ke halaman game yang dipilih
    navigate(`/games/${gameId}`);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-radial from-red-50 via-pink-100 to-red-100 p-6 flex flex-col items-center">
        <Decorations />
        
        <div className="relative z-10 max-w-4xl w-full pt-12 text-center">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-red-600 mb-8"
            style={{ fontFamily: 'Breathing' }}
          >
            Mini Games
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {games.map((game) => (
              <div
                key={game.id}
                className="bg-white rounded-2xl shadow-lg p-4 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => handleGameSelection(game.id)}
              >
                <img src={game.image} alt={game.name} className="w-full h-40 object-cover rounded-lg" />
                <h3 
                  className="text-xl font-semibold text-red-600 mt-4"
                  style={{ fontFamily: 'Lobster Two, cursive' }}
                >
                  {game.name}
                </h3>
              </div>
            ))}
          </motion.div>

          <button
            onClick={() => navigate('/features')}
            className="mt-6 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Kembali ke Features
          </button>
        </div>
      </div>
    </PageTransition>
  );
}

export default Games;