import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizData } from '../../data/games/quiz'; // Impor data quiz
import { motion, AnimatePresence } from 'framer-motion'; // Impor framer-motion untuk animasi

import clickSound from '../../assets/audio/tap.mp3';  // Suara untuk jawaban benar
import wrongSound from '../../assets/audio/wrong.mp3';  // Suara untuk jawaban salah

function Quiz() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State untuk animasi loading
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null); // State untuk melacak jawaban yang dipilih

  const handleAnswer = (selectedAnswer: string) => {
    setSelectedAnswer(selectedAnswer); // Set jawaban yang dipilih

    if (selectedAnswer === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion < quizData.length - 1) {
      // Animasi perpindahan pertanyaan
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null); // Reset jawaban yang dipilih untuk pertanyaan berikutnya
      }, 300); // Delay untuk animasi
    } else {
      // Animasi loading sebelum menampilkan hasil
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setShowResult(true);
      }, 1500); // Simulasi loading 1.5 detik
    }
  };

  // Fungsi untuk memutar suara klik
  const playClickSound = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };
  
  // Fungsi untuk memutar suara
  const playSound = (soundFile: string | undefined) => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  // Hitung progress kuis
  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-6">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div
            className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : showResult ? (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Hasil Kuis</h3>
            <p className="text-xl text-blue-500">
              Skor Anda: {score} dari {quizData.length}
            </p>
            <button
              onClick={() => navigate('/games')}
              className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg font-semibold shadow-md"
            >
              Kembali ke Pilihan Game
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <h3 className="text-2xl font-bold text-blue-600 mb-6">
                {quizData[currentQuestion].question}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quizData[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      handleAnswer(option); // Fungsi untuk menangani jawaban
                      // Pilih suara berdasarkan jawaban
                      if (option === quizData[currentQuestion].answer) {
                        playSound(clickSound);  // Suara untuk jawaban benar
                      } else {
                        playSound(wrongSound);  // Suara untuk jawaban salah
                      }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 rounded-lg transition-colors text-lg font-medium shadow-sm ${
                      selectedAnswer === option
                        ? option === quizData[currentQuestion].answer
                          ? 'bg-green-500 text-white' // Warna hijau untuk jawaban benar
                          : 'bg-red-500 text-white' // Warna merah untuk jawaban salah
                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100' // Warna default
                    }`}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
              <button
                onClick={() => {
                  navigate('/games');
                  playClickSound();
                }}
                className="mt-6 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-lg font-semibold shadow-md"
              >
                Batalkan Kuis
              </button>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

export default Quiz;