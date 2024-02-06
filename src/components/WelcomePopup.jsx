import { useState } from "react";
import { useAudio } from "../hooks/useAudio";
import "../styles/WelcomePopup.css";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { HiMiniSpeakerXMark } from "react-icons/hi2";
import LazyButtsLogo from "../assets/lazybutts.png";

const AudioControls = ({ audio, isPlaying, setIsPlaying }) => {
  return (
    <div className="audio-controls">
      {isPlaying ? (
        <HiMiniSpeakerXMark
          size="2em"
          color="white"
          onClick={() => {
            audio.pause();
            setIsPlaying(false);
          }}
        />
      ) : (
        <HiMiniSpeakerWave
          size="2em"
          color="white"
          onClick={() => {
            audio.play();
            setIsPlaying(true);
          }}
        />
      )}
    </div>
  );
};

const WelcomePopup = () => {
  const [open, setOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = useAudio("https://lazybutts.s3.amazonaws.com/public/audio/Tiki_Bar_Mixer.mp3", {
    volume: 0.8,
    playbackRate: 1,
    loop: true,
  });

  const handleClose = () => {
    audio.play();
    setIsPlaying(true);
    setOpen(false);
  };

  return (
    <div>
      <div
        className="welcome-popup"
        style={{ display: open ? "flex" : "none" }}
      >
        <div className="welcome-popup-content">
          <img width="40%" src={LazyButtsLogo} alt="LazyButts Logo" />
          <p className="marker">Welcome to the Lazy Butts experience! </p>
          <p>
            Click the button below to get started. You'll need to connect your
            wallet to claim your Lazy Butts or interact with your assets.
          </p>
          <button onClick={handleClose}>Let's Go!</button>
        </div>
      </div>
      <AudioControls
        audio={audio}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
};

export default WelcomePopup;
