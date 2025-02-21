import { useEffect, useState } from "react"; 
import ReactCurvedText from "react-curved-text"; // Library untuk membuat teks melengkung

// Interface untuk mendefinisikan properti yang dapat diterima oleh komponen
interface CurvedTextProps {
  text: string; // Isi teks yang akan ditampilkan secara melengkung
  fontFamily?: string; // Jenis font yang digunakan untuk teks
  color?: string; // Warna teks
  fontWeight?: string; // Ketebalan font (bold, normal, dll.)
  fontSize?: number; // Ukuran font teks (opsional)
}

// Komponen utama untuk menampilkan teks melengkung
const CurvedText = ({
  text,
  fontFamily = "Lobster Two, cursive", // Default font
  color = "white", // Default warna teks
  fontWeight = "bold", // Default ketebalan font
  fontSize: initialFontSize = 90, // Default ukuran font
}: CurvedTextProps) => {
  const [fontSize, setFontSize] = useState(initialFontSize); // State untuk menyimpan ukuran font yang bisa berubah

  useEffect(() => {
    const handleResize = () => {
      // Mengatur ukuran font berdasarkan lebar layar (responsif)
      if (window.innerWidth < 768) {
        setFontSize(58); // Ukuran font untuk layar kecil (mobile)
      } else if (window.innerWidth < 1024) {
        setFontSize(70); // Ukuran font untuk layar sedang (tablet)
      } else {
        setFontSize(initialFontSize); // Ukuran font untuk layar besar (desktop)
      }
    };

    handleResize(); // Menjalankan sekali saat komponen pertama kali dimuat
    window.addEventListener("resize", handleResize); // Tambahkan event listener untuk menangani perubahan ukuran layar
    return () => window.removeEventListener("resize", handleResize); // Hapus event listener saat komponen di-unmount
  }, [initialFontSize]);

  return (
    <>
      {/* Filter untuk memberikan efek bayangan 3D pada teks */}
      <svg width="0" height="0">
        <defs>
          <filter id="shadow3d" x="0" y="0" width="200%" height="200%">
            <feOffset result="offOut" in="SourceAlpha" dx="4" dy="4" /> 
            {/* Menggeser bayangan secara horizontal (dx) dan vertikal (dy) */}
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="1" />
            {/* Membuat efek blur pada bayangan */}
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            {/* Menggabungkan bayangan dengan teks */}
          </filter>
        </defs>
      </svg>

      {/* Komponen ReactCurvedText untuk menampilkan teks melengkung */}
      <ReactCurvedText
        width={410} // Lebar area SVG tempat teks melengkung
        height={100} // Tinggi area SVG tempat teks melengkung
        cx={200} // Posisi titik tengah lingkaran (sumbu X)
        cy={150} // Posisi titik tengah lingkaran (sumbu Y) - bisa diturunkan jika teks terpotong
        rx={250} // Radius sumbu X untuk lengkungan teks
        ry={70} // Radius sumbu Y untuk lengkungan teks (semakin besar, semakin datar)
        startOffset={40} // Offset awal teks dalam jalur melengkung
        reversed={true} // Membalikkan arah teks pada jalur melengkung
        text={text} // Teks yang akan ditampilkan

        textProps={{
          style: {
            fontFamily, // Menggunakan fontFamily yang diberikan sebagai prop
            fontSize: `${fontSize}px`, // Menggunakan ukuran font dari state
            fontWeight, // Menggunakan fontWeight dari prop
            fill: color, // Warna teks
            filter: "url(#shadow3d)", // Menerapkan efek bayangan 3D dari filter SVG di atas
          },
        }}
        textPathProps={{
          startOffset: "25%", // Menyesuaikan posisi awal teks pada jalur melengkung
          textAnchor: "middle", // Menjadikan teks berpusat pada jalur
        }}
      />
    </>
  );
};

export default CurvedText; // Mengekspor komponen agar bisa digunakan di file lain
