import { motion } from 'framer-motion';

interface TimerProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function Timer({ days, hours, minutes, seconds }: TimerProps) {
  const timeBlocks = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds }
  ];

  return (
    <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
      {timeBlocks.map((block, index) => (
        <motion.div
          key={block.label}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center shadow-lg border-2 border-red-200"
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
            className="block text-3xl md:text-4xl font-bold text-red-600 mb-2"
          >
            {block.value}
          </motion.span>
          <span className="text-sm text-red-400">{block.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

export default Timer;