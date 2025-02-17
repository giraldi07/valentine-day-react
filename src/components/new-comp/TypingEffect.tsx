import React, { useEffect, useState } from "react";

interface TypingEffectProps {
  text: string; // Teks yang akan ditampilkan
  speed?: number; // Kecepatan efek ketik (ms per karakter)
  color?: string; // Warna teks (opsional)
  fontFamily?: string; // Tipe font (opsional)
  fontWeight?: string; // Ketebalan font (opsional)
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  text,
  speed = 100,
  color,
  fontFamily,
  fontWeight,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

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
        color: color || "inherit", // Gunakan warna dari props atau warna default
        fontFamily: fontFamily || "inherit", // Gunakan font dari props atau font default
        fontWeight: fontWeight || "normal", // Gunakan ketebalan font dari props atau normal
      }}
    >
      {displayText}
    </span>
  );
};

export default TypingEffect;