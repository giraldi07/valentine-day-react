import React from "react";
import { useSpring, animated } from "@react-spring/web";
import { Heart } from "lucide-react";
import type { HeartBarProps } from "../../types/index";

const HeartBar: React.FC<HeartBarProps> = ({ fillPercentage }) => {
  const fillProps = useSpring({
    height: `${fillPercentage}%`,
    config: { tension: 300, friction: 20 },
  });

  return (
    <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-20 lg:h-64 bg-pink-300 border-2 border-red-500 rounded-full mx-auto overflow-hidden aspect-square">
      {/* Bagian yang terisi */}
      <animated.div
        style={fillProps}
        className="absolute bottom-0 w-full bg-gradient-to-t from-red-500 to-pink-400"
      />

      {/* Ikon hati di tengah */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Heart className="w-12 h-12 text-white" fill="white" />
      </div>
    </div>
  );
};

export default HeartBar;
