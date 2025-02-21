// data/pages-data/main-gift.ts

import imageSatu from '../../../assets/images/upload-foto/image1.jpg';
import imageDua from '../../../assets/images/upload-foto/image2.jpg';
import imageTiga from '../../../assets/images/upload-foto/image3.jpg';
import imageEmpat from '../../../assets/images/upload-foto/image4.jpg';
import VideoGift from '../../../assets/video/valvid.mp4';
import ThumbnailVideo from '../../../assets/images/upload-foto/sweetlove.jpg';
import backgroundImage from '../../../assets/images/book-bg.png'; // Import gambar background

export const mainGiftData = {
  backgroundImage: backgroundImage, // Background halaman
  title: "Special For You", // Judul halaman utama
  leftNote: {
    // teks maksimal 500 karakter
    text: `"Selamat ulang tahun, sayangku! Hari ini adalah hari spesial untuk merayakan 
           keberadaanmu yang begitu berarti dalam hidupku. Setiap momen bersamamu adalah 
           hadiah terindah yang tak ternilai harganya.

           Aku bersyukur bisa mengenalmu, mencintaimu, dan tumbuh bersamamu. Setiap tawa, 
           setiap pelukan, dan setiap percakapan kita adalah kenangan manis yang selalu 
           membuatku bahagia.

           Semoga di hari ulang tahunmu ini, kamu merasa dicintai, dihargai, dan disayangi 
           seperti cara kamu mencintaiku. Aku berjanji akan selalu ada untukmu, dalam suka 
           maupun duka. Selamat ulang tahun, cintaku".`,
    fontFamily: "Lobster Two", // Font untuk teks kiri
  },
  rightNote: {
    text: `"Terimakasih ya sayang udah mau nerima hadiah ini".`,
    signature: "-- From your sweet heart --", // Tanda tangan
    fontFamily: "Lobster Two", // Font untuk teks kanan
  },
  cover: {
    title: "Special Gift", // Judul cover
    subtitle: "For Someone Special", // Subjudul cover
    instruction: "Click or Swipe to flip the pages", // Instruksi
    icon: "MdCardGiftcard", // Ikon hadiah
    backgroundColor: "bg-gradient-to-r from-pink-400 to-red-500", // Warna background cover
  },
  slides: [
    // maksimal teks 258 karakter setiap halaman
    { 
      text: "Selamat datang di hadiah spesial ini, sebuah kumpulan kenangan indah yang kami persembahkan untukmu. Setiap gambar dan cerita di sini adalah bukti cinta dan kebahagiaan kita. Aku ingin kamu tahu bahwa setiap detik bersamamu adalah anugerah yang tak ternilai.", 
      image: imageSatu 
    },
    { 
      text: "Cinta adalah perjalanan yang penuh warna. Setiap tawa, pelukan, dan kebersamaan kita adalah bagian dari kisah indah yang ingin terus aku jalani bersamamu.", 
      image: imageDua 
    },
    { 
      text: "Kenangan manis selalu abadi, seperti senyummu yang menghangatkan hati. Terima kasih telah menjadi bagian dari hidupku dan membuat setiap hari terasa lebih berharga.", 
      image: imageTiga 
    },
    { 
      text: "Hadiah ini dibuat dengan penuh kasih sayang, sebagai ungkapan terima kasih atas kebahagiaan yang kau berikan. Semoga ini bisa menjadi pengingat betapa berharganya kamu bagiku.", 
      image: imageEmpat 
    },
    { 
      text: "Tonton video kenangan spesial ini, kumpulan momen indah yang telah kita lalui bersama. Semoga ini bisa membawa senyum dan mengingatkanmu betapa aku mencintaimu.", 
      video: VideoGift,
      thumbnail: ThumbnailVideo 
    },
  ],

};