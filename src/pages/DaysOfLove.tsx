import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, parse } from 'date-fns';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
// import Timer from '../components/Timer';
import Decorations from '../components/Decorations';
import PageTransition from '../components/PageTransition';

function DaysOfLove() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const updateTime = () => {
      const anniversaryDate = localStorage.getItem('anniversaryDate');
      if (anniversaryDate) {
        const startDate = parse(anniversaryDate, 'yyyy-MM-dd', new Date());
        const now = new Date();
        
        setDays(differenceInDays(now, startDate));
        setHours(differenceInHours(now, startDate) % 24);
        setMinutes(differenceInMinutes(now, startDate) % 60);
        setSeconds(differenceInSeconds(now, startDate) % 60);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-radial from-red-50 via-pink-100 to-red-100 relative overflow-hidden">
        <Decorations />
        
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 space-y-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
            className="text-center"
          >
            <div className="flex justify-center mb-8">
              <Heart size={60} className="text-red-500 animate-pulse" />
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-red-600 mb-4">
              Our Love Journey
            </h2>

            <p className="text-xl md:text-2xl text-red-400 mb-12">
              Every moment with you is precious...
            </p>
          </motion.div>

          {/* <Timer
            days={days}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
          /> */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-red-500 text-lg mb-8">
              {days} days, {hours} hours, {minutes} minutes, and {seconds} seconds of endless love ❤️
            </p>

            <button
              onClick={() => navigate('/features')}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all"
            >
              Continue Our Journey
            </button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}

export default DaysOfLove;