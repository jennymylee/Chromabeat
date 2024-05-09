import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Record from "./components/Record/Record";
import SongTitleView from "./components/SongTitleView/SongTitleView";
import SongControlsView from "./components/SongControlsView/SongControlsView";
import Audio from "./components/AudioAnimation/Audio";
import ColorPicker from "./components/ColorPicker/ColorPicker";
import songs from "./data/songs";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  const [progress, setProgress] = useState({ dur: 0, curTime: 0 });
  const song = songs[songIndex];
  const [tileColors, setTileColors] = useState([
    "#FF5733", // Orange
    "#9B59B6", // Purple
    "#3498DB", // Blue
    "#08E600", // Green
    "#F1C40F", // Yellow
    "#E600CF", // Hot pink
    "#1ABC9C", // Turquoise
    "#A93226", // Dark red
  ]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePreviousSong = () => {
    setSongIndex((songIndex - 1) % songs.length);
    setIsPlaying(true);
  };

  const handleNextSong = () => {
    setSongIndex((songIndex + 1) % songs.length);
    setIsPlaying(true);
  };

  const handleProgress = (progress) => {
    setProgress(progress);
  };

  return (
    <div className="App">
      <Navbar />
      <div className="components">
        {/* <Animation song={songs[songIndex]} /> */}
        <div className="left-column">
          <SongTitleView song={song} />
        </div>
        <div className="middle-column">
          <Record
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            togglePlay={togglePlay}
            img={song.img}
            album={song.album}
          />
          <Audio
            isPlaying={isPlaying}
            song={songs[songIndex]}
            handleProgress={handleProgress}
            tileColors={tileColors}
          />
          <SongControlsView
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            togglePlay={togglePlay}
            handleNextSong={handleNextSong}
            handlePreviousSong={handlePreviousSong}
            dur={progress.dur}
            curTime={progress.curTime}
          />
        </div>
        <div className="right-column">
          <ColorPicker tileColors={tileColors} setTileColors={setTileColors} />
        </div>
      </div>
    </div>
  );
}

export default App;
