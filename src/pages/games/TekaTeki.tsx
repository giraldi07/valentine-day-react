import { useNavigate } from 'react-router-dom';
import TekaTekiData from '../../data/games/tekateki';

import clickSound from '../../assets/audio/tap.mp3'; // Import file suara

function TekaTeki() {
  const navigate = useNavigate();

  // Fungsi untuk memutar suara klik
  const playClickSound = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  return (
    <div className="min-h-screen bg-gradient-radial from-gray-50 via-gray-300 to-gray-500 p-6 flex flex-col items-center justify-center">
      {/* Container untuk iframe */}
      <div className="w-full max-w-4xl h-[70vh] relative">
        <iframe
          src={TekaTekiData.embedUrl}
          title={TekaTekiData.title}
          className="w-full h-full border-4 border-black rounded-lg shadow-lg"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          frameBorder="0"
        />
      </div>

      {/* Tombol Kembali */}
      <button
        onClick={() => {
          navigate('/games');
          playClickSound(); // Memutar suara klik
        }}
        className="mt-8 px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-lg font-semibold shadow-md"
      >
        Kembali ke Pilihan Game
      </button>
    </div>
  );
}

export default TekaTeki;