import { motion } from 'framer-motion';

interface NumPadProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

function NumPad({ value, onChange, onSubmit }: NumPadProps) {
  const buttons = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    'clear', '0', 'enter'
  ];

  const handleClick = (btn: string) => {
    if (btn === 'clear') {
      onChange('');
    } else if (btn === 'enter') {
      onSubmit();
    } else {
      if (value.length < 8 && /^[0-9]*$/.test(btn)) {
        onChange(value + btn);
      }
    }
  };

  const formatDisplay = (val: string): string => {
    if (val.length === 0) return 'DD/MM/YY';
    
    let formatted = val;
    if (val.length >= 2) {
      formatted = formatted.slice(0, 2) + '/' + formatted.slice(2);
    }
    if (val.length >= 5) {
      formatted = formatted.slice(0, 5) + '/' + formatted.slice(5);
    }
    return formatted;
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 mb-4 text-center shadow-lg border-2 border-red-200">
        <motion.span
          animate={{ scale: value ? [1, 1.05, 1] : 1 }}
          transition={{ duration: 0.2 }}
          className="text-2xl font-bold text-red-600"
        >
          {formatDisplay(value)}
        </motion.span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {buttons.map((btn) => (
          <motion.button
            key={btn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(btn)}
            className={`
              p-4 rounded-lg font-bold text-lg shadow-md transition-all
              ${btn === 'enter' ? 'bg-red-500 text-white hover:bg-red-600' :
                btn === 'clear' ? 'bg-pink-200 text-red-600 hover:bg-pink-300' :
                'bg-white text-red-600 hover:bg-red-50'}
            `}
          >
            {btn === 'enter' ? '✓' : btn === 'clear' ? '×' : btn}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default NumPad;
