import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckSquare, Square } from "lucide-react"; 
import PageTransition from "../components/PageTransition";
import Decorations from "../components/Decorations";
import ImageBackground from '../assets/images/paper.svg';
import LeftLineBottom from '../assets/images/crawl-line.svg';
import RightLineBottom from '../assets/images/heart-outline.svg';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

function TodoList() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<TodoItem[]>(() => {
    const saved = localStorage.getItem("valentineActivities");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, text: "Dinner Date", completed: false },
          { id: 2, text: "Zoo", completed: false },
          { id: 3, text: "Kiss in Car", completed: false },
        ];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    localStorage.setItem("valentineActivities", JSON.stringify(activities));
  }, [activities]);

  const toggleActivity = (id: number) => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === id
          ? { ...activity, completed: !activity.completed }
          : activity
      )
    );
  };

  const handleSaveAndBack = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        navigate("/features");
      }, 1500);
    }, 2000);
  };

  return (
    <PageTransition>
      <div className="relative overflow-hidden min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-10 sm:16 md:p-24">
        <Decorations />

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


        {/* Kontainer Utama */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-40 mx-auto max-w-3xl lg:max-w-4xl xl:max-w-5xl bg-white/90 backdrop-blur-sm rounded-md shadow-lg mt-24 md:mt-2 p-10 sm:p-16 md:p-24 border-4 border-gray-700 border-dotted"
          style={{
            backgroundImage: `url(${ImageBackground})`, // Gunakan backtick untuk template literal
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {/* Judul */}
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-3xl md:text-4xl font-bold text-red-600 text-center mb-8"
            style={{
              fontFamily: 'Breathing',
            }}
          >
            Choose For This Month
          </motion.h1>

          {/* Grid Daftar Aktivitas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="flex items-center justify-between p-4 border-2 border-gray-800 shadow-md bg-white hover:bg-pink-50 transition-all duration-300 rounded-lg"
              >
                {/* Teks Aktivitas */}
                <span
                  className={`text-base md:text-lg ${
                    activity.completed
                      ? "line-through text-pink-500"
                      : "text-pink-700"
                  }`}
                >
                  {activity.text}
                </span>

                {/* Kotak Checklist */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleActivity(activity.id)}
                  className="cursor-pointer"
                >
                  {activity.completed ? (
                    <CheckSquare className="text-pink-500 w-6 h-6" />
                  ) : (
                    <Square className="text-pink-300 w-6 h-6" />
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Tombol Save & Back */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-6 md:mt-8"
          >
            <button
              onClick={handleSaveAndBack}
              disabled={isLoading}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
              style={{ fontFamily: "Lobster Two, cursive" }}
            >
              {isLoading ? "Saving..." : "Save & Back"}
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Popup Berhasil */}
      {showSuccessPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ type: "spring", stiffness: 120, damping: 10 }}
            className="bg-white rounded-lg shadow-lg p-4 md:p-6 text-center w-full max-w-sm"
          >
            <h2 className="text-xl md:text-2xl font-bold text-red-600 mb-3 md:mb-4">
              Berhasil Disimpan!
            </h2>
            <p className="text-gray-700 text-sm md:text-base">
              Data Anda telah disimpan dengan sukses.
            </p>
          </motion.div>
        </motion.div>
      )}
    </PageTransition>
  );
}

export default TodoList;
