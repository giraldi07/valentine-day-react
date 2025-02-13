import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import NumPad from '../components/NumPad';
import PageTransition from '../components/PageTransition';
import Decorations from '../components/Decorations';
import ChartBar from '../components/ChartBar';
import ModalError from '../components/ModalError';
import SuccessPopup from '../components/SuksesPopup';
import errorSound from '../assets/audio/wrong.mp3';
import successSound from '../assets/audio/success.mp3';

function DateInput() {
  const [date, setDate] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const correctDate = '11/11/1111';

  const playSound = (soundFile: string | undefined) => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  const handleSubmit = () => {
    const cleanedDate = date.replace(/\D/g, '');
    let formattedDate = cleanedDate;
    if (cleanedDate.length >= 2) {
      formattedDate = cleanedDate.slice(0, 2) + '/' + cleanedDate.slice(2);
    }
    if (cleanedDate.length >= 4) {
      formattedDate = formattedDate.slice(0, 5) + '/' + formattedDate.slice(5);
    }

    if (formattedDate === correctDate) {
      playSound(successSound);
      setIsSuccess(true);
      setTimeout(() => {
        const formattedDateForStorage = `20${formattedDate.slice(6, 8)}-${formattedDate.slice(3, 5)}-${formattedDate.slice(0, 2)}`;
        localStorage.setItem('anniversaryDate', formattedDateForStorage);
        navigate('/days-of-love');
      }, 2000);
    } else {
      playSound(errorSound);
      setIsError(true);
    }
  };

  const progress = (date.length / 8) * 100;

  useEffect(() => {
    if (isError) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isError]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-radial from-red-50 via-pink-100 to-red-100 flex items-center justify-center p-4 relative">
        <Decorations />

        {/* Efek Radar Merah saat Error */}
        <AnimatePresence>
          {isError && (
            <>
              {/* Radar di sisi kiri */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 3.5, opacity: 0.7 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.6, repeat: 2, repeatType: "reverse" }}
                className="fixed left-0 top-1/2 transform -translate-y-1/2 w-32 h-32 bg-red-900 bg-opacity-70 blur-[50px] pointer-events-none"
              />

              {/* Radar di sisi kanan */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 3.5, opacity: 0.7 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.6, repeat: 2, repeatType: "reverse" }}
                className="fixed right-0 top-1/2 transform -translate-y-1/2 w-32 h-32 bg-red-900 bg-opacity-70 blur-[50px] pointer-events-none"
              />

              {/* Radar di sisi atas */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 3.5, opacity: 0.7 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.6, repeat: 2, repeatType: "reverse" }}
                className="fixed top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-red-900 bg-opacity-70 blur-[50px] pointer-events-none"
              />

              {/* Radar di sisi bawah */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 3.5, opacity: 0.7 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.6, repeat: 2, repeatType: "reverse" }}
                className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-red-900 bg-opacity-70 blur-[50px] pointer-events-none"
              />
            </>
          )}
        </AnimatePresence>

        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
              className="flex justify-center mb-6"
            >
              <Calendar size={40} className="text-red-500" />
            </motion.div>

            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-gray-800 mb-4"
            >
              When did our love story begin?
            </motion.h2>

          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-cols-2 items-center gap-6"
          >
            {/* Chart Bar */}
            <ChartBar progress={progress} />

            {/* Inputan dengan efek getar saat salah */}
            <motion.div
              animate={isError ? { x: [-5, 5, -5, 5, 0] } : {}}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <NumPad
                value={date}
                onChange={(value) => {
                  if (value.length <= 8) {
                    setDate(value);
                  }
                }}
                onSubmit={handleSubmit}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Modal Error */}
        <ModalError isOpen={isError} onClose={() => setIsError(false)} />
        
        <SuccessPopup isOpen={isSuccess} onClose={() => setIsSuccess(false)} />
      </div>
    </PageTransition>
  );
}

export default DateInput;