// components/VideoPlayer.tsx

import { useRef, useState } from "react";

interface VideoPlayerProps {
  src: string;
  onEnded: () => void;
}

export default function VideoPlayer({ src, onEnded }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        videoRef.current?.requestFullscreen();
        setIsPlaying(true);
      }).catch((error) => {
        console.error("Error attempting to play video:", error);
      });
    }
  };

  const handleExitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    onEnded(); // Panggil onEnded untuk menyembunyikan video
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black z-50 flex items-center justify-center">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-contain"
        controls
        autoPlay
        muted // Tambahkan muted untuk menghindari blokir autoplay
        onEnded={handleExitFullscreen}
        onLoadedData={handlePlayVideo} // Otomatis play saat video siap
      />
      {isPlaying && (
        <button
          onClick={handleExitFullscreen}
          className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-lg shadow-lg"
        >
          Kembali
        </button>
      )}
    </div>
  );
}