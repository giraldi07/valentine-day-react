import { useEffect, useState } from "react";
import ReactCurvedText from "react-curved-text";

interface CurvedTextProps {
  text: string;
  fontFamily?: string;
  color?: string;
  fontWeight?: string;
}

const CurvedText = ({
  text,
  fontFamily = "Lobster Two, cursive",
  color = "white",
  fontWeight = "bold",
}: CurvedTextProps) => {
  const [fontSize, setFontSize] = useState(90);

  useEffect(() => {
    const handleResize = () => {
      setFontSize(window.innerWidth < 768 ? 58 : 80);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Filter untuk efek 3D */}
      <svg width="0" height="0">
        <defs>
          <filter id="shadow3d" x="0" y="0" width="200%" height="200%">
            <feOffset result="offOut" in="SourceAlpha" dx="4" dy="4" />
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="5" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
          </filter>
        </defs>
      </svg>

      {/* Teks melengkung dengan efek 3D */}
      <ReactCurvedText
        width={400}
        height={120}
        cx={200}
        cy={150}
        rx={200}
        ry={70}
        startOffset={40}
        reversed={true}
        text={text}
        textProps={{
          style: {
            fontFamily,
            fontSize,
            fontWeight,
            fill: color,
            filter: "url(#shadow3d)",
          },
        }}
        textPathProps={{
          startOffset: "25%",
          textAnchor: "middle",
        }}
      />
    </>
  );
};

export default CurvedText;
