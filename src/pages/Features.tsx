import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import { features } from '../data/features';
import PageTransition from '../components/PageTransition';
import Decorations from '../components/Decorations';

function Features() {
  const navigate = useNavigate();
  const [showFeatures, setShowFeatures] = useState(false);

  const toggleFeatures = () => {
    setShowFeatures(!showFeatures);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-radial from-red-50 via-pink-100 to-red-100 p-6">
        <Decorations />
        
        <div className="relative z-10 max-w-4xl mx-auto pt-12">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-red-600 text-center mb-4"
          >
            Welcome
          </motion.h2>
          
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-red-400 text-center mb-16"
          >
            Let's explore our love journey together
          </motion.p>
          
          <div className="flex justify-center items-center gap-8 md:gap-12 flex-wrap relative">
            {/* Ikon Utama (Love Fill) */}
            <motion.div
              onClick={toggleFeatures}
              className="flex flex-col items-center cursor-pointer z-20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-24 h-24 md:w-28 md:h-28 bg-red-500 rounded-full shadow-lg flex items-center justify-center mb-3 mt-24">
                <Icons.Heart className="w-12 h-12 text-white" fill="currentColor" />
              </div>
              <span className="text-red-600 font-medium"></span>
            </motion.div>

            {/* Ikon Fitur */}
            {features.map((feature, index) => {
              const Icon = Icons[feature.icon as keyof typeof Icons] as React.ElementType;
              
              if (!Icon) {
                console.error(`Icon "${feature.icon}" not found`);
                return null;
              }
              
              return (
                <motion.div
                  key={feature.id}
                  initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                  animate={{
                    scale: showFeatures ? 1 : 0,
                    opacity: showFeatures ? 1 : 0,
                    x: showFeatures ? Math.cos((index * 2 * Math.PI) / features.length) * 150 : 0,
                    y: showFeatures ? Math.sin((index * 2 * Math.PI) / features.length) * 150 : 0,
                  }}
                  transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
                  onClick={() => navigate(feature.path)}
                  className="flex flex-col items-center cursor-pointer absolute mt-24"
                >
                  <motion.div
                    whileHover={feature.animation.hover}
                    whileTap={feature.animation.tap}
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full shadow-lg flex items-center justify-center mb-3">
                      <Icon className="w-10 h-10 md:w-12 md:h-12 text-red-500" />
                    </div>
                  </motion.div>
                  <span className="text-red-600 font-medium">{feature.title}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Features;