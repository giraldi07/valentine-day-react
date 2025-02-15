import ReactCurvedText from "react-curved-text";

const CurvedText = () => {
  return (
    <ReactCurvedText
      width={400} // Lebar area teks
      height={120} // Tinggi area teks (disesuaikan dengan lengkungan)
      cx={200} // Titik pusat X
      cy={150} // Titik pusat Y (atur agar lebih rendah untuk melengkung ke bawah)
      rx={200} // Radius horizontal (sesuaikan agar tidak terlalu melengkung)
      ry={70} // Radius vertikal untuk menyesuaikan bentuk lengkungan
      startOffset={40} // Mengatur posisi teks di jalur lengkungan
      reversed={true} // Membuat teks melengkung ke bawah
      text="This is For"
      textProps={{
        style: {
          fontFamily: "Lobster Two, cursive",
          fontSize: 90,
          fontWeight: "bold",
          fill: "#ee746e", // Warna teks
        },
      }}
      textPathProps={{
        startOffset: "25%",
        textAnchor: "middle",
      }}
    />
  );
};

export default CurvedText;
