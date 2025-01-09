import React, { useEffect, useRef, useState, useCallback } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

function AudioPlayer({ audioSrc, image }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef();

  const handleSeekChange = (e) => {
    setCurrentTime(e.target.value);
    audioRef.current.currentTime = e.target.value;
  };

  const formatTime = useCallback((time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  }, []);

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    audioRef.current.volume = e.target.value;
  };

  const handleTimeUpdate = () => setCurrentTime(audioRef.current.currentTime);
  const handleMetadataLoad = () => setDuration(audioRef.current.duration);
  const handleEnded = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleMetadataLoad);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleMetadataLoad);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = isMute ? 0 : volume;
  }, [isMute, volume]);

  return (
    <div className="w-full fixed bottom-0 left-0 px-12 p-4 flex justify-center items-center gap-4 bg-[rgba(14,2,21,0.8)]">
      <img src={image} alt="Audio thumbnail" className="h-12 w-12 object-cover" />
      <audio ref={audioRef} src={audioSrc} />
      <p onClick={() => setIsPlaying((prev) => !prev)}>{isPlaying ? <FaPause className="text-white text-2xl" /> : <FaPlay className="text-white text-2xl" />}</p>
      <div className="flex w-10/12 gap-2">
        <p>{formatTime(currentTime)}</p>
        <input type="range" step={0.01} max={duration} value={currentTime} onChange={handleSeekChange} className="hue-rotate-[25deg] w-full" />
        <p>{formatTime(duration - currentTime)}</p>
        <p onClick={() => setIsMute((prev) => !prev)}>{isMute ? <FaVolumeMute className="text-white text-2xl" /> : <FaVolumeUp className="text-white text-2xl" />}</p>
        <input type="range" step={0.01} max={1} min={0} value={volume} onChange={handleVolumeChange} className="hue-rotate-[25deg] w-2/12" />
      </div>
    </div>
  );
}

export default AudioPlayer;
