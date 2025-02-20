import React, { useEffect, useState } from "react";

interface TypingEffectProps {
  text: string;
  speed?: number;
  color?: string;
  fontFamily?: string;
  fontWeight?: string;
  fontSize?: { base: string; sm: string; md: string; lg: string };
  letterSpacing?: string;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  text,
  speed = 100,
  color,
  fontFamily,
  fontWeight,
  fontSize = { base: "32px", sm: "40px", md: "48px", lg: "64px" },
  letterSpacing,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [responsiveFontSize, setResponsiveFontSize] = useState(fontSize.base);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setResponsiveFontSize(fontSize.lg);
      } else if (window.innerWidth >= 768) {
        setResponsiveFontSize(fontSize.md);
      } else if (window.innerWidth >= 640) {
        setResponsiveFontSize(fontSize.sm);
      } else {
        setResponsiveFontSize(fontSize.base);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [fontSize]);

  useEffect(() => {
    if (!isDeleting && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentIndex > 0) {
      const timeout = setTimeout(() => {
        setDisplayText((prevText) => prevText.slice(0, -1));
        setCurrentIndex((prevIndex) => prevIndex - 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (!isDeleting && currentIndex === text.length) {
      setTimeout(() => setIsDeleting(true), speed * 3);
    } else if (isDeleting && currentIndex === 0) {
      setIsDeleting(false);
    }
  }, [currentIndex, text, speed, isDeleting]);

  return (
    <span
      className="inline-block"
      style={{
        color: color || "inherit",
        fontFamily: fontFamily || "inherit",
        fontWeight: fontWeight || "normal",
        fontSize: responsiveFontSize, // Gunakan fontSize responsif
        letterSpacing: letterSpacing || "normal",
        textShadow: "2px 2px 0px rgba(0, 0, 0, 0.8)",
      }}
    >
      {displayText}
    </span>
  );
};

export default TypingEffect;
