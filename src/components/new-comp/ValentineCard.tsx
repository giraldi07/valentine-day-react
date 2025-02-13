import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const ValentineCard: React.FC = () => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-sm mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="relative h-48 sm:h-64">
        <img
          src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&auto=format&fit=crop&q=60"
          alt="Valentine"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/50 to-transparent" />
        <Heart
          className="absolute bottom-4 right-4 w-8 h-8 text-white"
          fill="white"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-pink-600 mb-2">
          Our Love Story
        </h3>
        <p className="text-gray-600">
          Every moment with you is a beautiful page in our story. Let's continue writing our journey together.
        </p>
      </div>
    </motion.div>
  );
};

export default ValentineCard;