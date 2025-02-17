export const openingData = {
  background: {
    image: '/assets/images/gif/blink-blink.gif',
    overlayColor: 'bg-black bg-opacity-10',
  },
  lottieAnimation: {
    data: '/assets/lottie-animations/red-line-love.json',
    className: 'w-full max-h-[200px] sm:max-h-[250px] md:max-h-[300px] h-auto',
  },
  title: {
    text: 'CurvedText', // Jika CurvedText adalah komponen, kita bisa menyimpan konfigurasinya di sini
    className: 'text-center mt-2 mb-4 md:mb-8 px-4 z-50',
  },
  typingEffect: {
    text: '{Masukan Nama Disini}',
    speed: 90,
    className: 'text-lg sm:text-2xl md:text-3xl mb-6 sm:mb-8 px-4 text-center w-full max-w-[80%] sm:max-w-[70%] md:max-w-[60%] z-50',
    style: {
      height: '100px',
      fontWeight: 'bold',
      fontFamily: 'League Spartan',
    },
  },
  slideButton: {
    className: 'w-full max-w-[180px] sm:max-w-[200px] md:max-w-[220px] px-2 z-50',
  },
  lineLove: {
    left: {
      image: '/assets/images/line-love.svg',
      className: 'absolute top-[-6vw] left-[-2vw] w-[20vw] md:w-[20vw] sm:w-[40vw] h-auto object-cover -rotate-45',
    },
    right: {
      image: '/assets/images/line-love.svg',
      className: 'absolute top-[-6vw] right-[-2vw] w-[20vw] md:w-[20vw] sm:w-[40vw] h-auto object-cover scale-x-[-1] rotate-45',
    },
  },
  clouds: {
    left: {
      image: '/assets/images/cloudL.svg',
      className: 'w-1/2 h-auto object-cover',
    },
    right: {
      image: '/assets/images/cloudR.svg',
      className: 'w-1/2 h-auto object-cover scale-x-[-1]',
    },
  },
};