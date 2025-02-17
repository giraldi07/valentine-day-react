import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Quiz() {
  const navigate = useNavigate();
  const questions = [
    {
      question: "Apa warna yang identik dengan Valentine's Day?",
      options: ["Merah", "Biru", "Hijau", "Kuning"],
      answer: "Merah"
    },
    {
      question: "Apa simbol cinta yang paling umum?",
      options: ["Hati", "Bintang", "Bulan", "Matahari"],
      answer: "Hati"
    },
    {
      question: "Apa hadiah yang paling sering diberikan pada Valentine's Day?",
      options: ["Cokelat", "Bunga", "Perhiasan", "Kartu"],
      answer: "Cokelat"
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (selectedAnswer: string) => {
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-radial from-red-50 via-pink-100 to-red-100 p-6 flex flex-col items-center">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        {showResult ? (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-red-600 mb-4">Hasil Kuis</h3>
            <p className="text-xl text-red-500">
              Skor Anda: {score} dari {questions.length}
            </p>
            <button
              onClick={() => navigate('/games')}
              className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Kembali ke Pilihan Game
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-red-600 mb-4">
              {questions[currentQuestion].question}
            </h3>
            <div className="flex flex-col gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="px-6 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              onClick={() => navigate('/games')}
              className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Kembali ke Pilihan Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;