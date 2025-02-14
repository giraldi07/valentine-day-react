import { motion } from "framer-motion";

interface ChartBarProps {
  progress: number; // Progress dalam persentase (0-100)
}

function ChartBar({ progress }: ChartBarProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Icon Love di atas bar */}
      <div className="mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 text-red-500 drop-shadow-lg"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>

      {/* Chart Bar */}
      <div className="w-10 sm:w-12 md:w-16 h-40 sm:h-48 md:h-60 bg-pink-200 rounded-2xl overflow-hidden relative shadow-lg border-4 border-pink-950">
        {/* Bar dengan efek 3D dan gradient */}
        <motion.div
          className="w-full bg-gradient-to-t from-red-500 to-pink-400 absolute bottom-0 rounded-t-xl shadow-inner"
          initial={{ height: "0%" }}
          animate={{ height: `${progress}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          style={{
            boxShadow: "inset 0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        />
        
        {/* Efek cahaya untuk kesan 3D */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: "linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>
    </div>
  );
}

export default ChartBar;
