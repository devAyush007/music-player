"use client"
import React, { useState, useEffect } from "react";

const MusicPlayer = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [audio, setAudio] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAudioChange = (event) => {
    const file = event.target.files[0];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setAudioFile(URL.createObjectURL(file));
    setAudio(new Audio(URL.createObjectURL(file)));
    setIsPlaying(false);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (audio) {
      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", updateDuration);

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", updateDuration);
      };
    }
  }, [audio]);

  const updateTime = () => {
    setCurrentTime(audio.currentTime);
  };

  const updateDuration = () => {
    setDuration(audio.duration);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
      <input
        name="audioFile"
        type="file"
        id="audioFile"
        accept=".mp3"
        onChange={handleAudioChange}
        className="mb-4"
      />
      {audio && (
        <div className="text-center">
          <button
            onClick={handleTogglePlay}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold mr-2"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <div className="text-gray-600">
            Current Time: {formatTime(currentTime)}
            <br />
            Song Duration: {formatTime(duration)}
          </div>
          <progress
            value={currentTime}
            max={duration}
            style={{ width: "100%" }}
            className="mt-4"
          ></progress>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
