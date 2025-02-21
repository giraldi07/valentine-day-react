import { useState, useRef, useEffect } from 'react';
import { FaMusic, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import FileMusic from '../../assets/audio/music.mp3';

const MusicBackground = () => {
  const [isMuted] = useState(false);
  const [volume, setVolume] = useState(0.5); // Set default volume to 50%
  const [isSettingsVisible, setIsSettingsVisible] = useState(false); // To toggle settings visibility
  const audioRef = useRef<HTMLAudioElement>(null); // Create a ref for the audio element


  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
  };

  const toggleSettings = () => {
    setIsSettingsVisible((prev) => !prev);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  return (
    <div className="music-background">
      {/* Audio background */}
      <audio
        ref={audioRef} // Attach the ref to the audio element
        src={FileMusic}
        autoPlay
        loop
        className="hidden"
      ></audio>

      {/* Floating button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleSettings} // Toggle settings visibility on button click
          className="bg-indigo-600 text-white rounded-full p-4 shadow-lg"
        >
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
      </div>

      {/* Settings menu */}
      {isSettingsVisible && (
        <div className="fixed bottom-20 right-10 z-50 bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <FaMusic className="mr-2" />
            <span>Background Music</span>
          </div>
          <div className="flex items-center space-x-4">
            <label>Volume</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicBackground;
