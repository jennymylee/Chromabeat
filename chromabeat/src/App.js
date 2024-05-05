import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Record from "./components/Record/Record";
import SongTitleView from "./components/SongTitleView/SongTitleView";
import SongControlsView from "./components/SongControlsView/SongControlsView";
import Audio from "./components/Audio/Audio";
import ColorPicker from "./components/ColorPicker/ColorPicker";
import songs from "./data/songs";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  const song = songs[songIndex];

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

  return (
    <div className="App">
      <Navbar />
      <div className="components">
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
          <SongControlsView
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            togglePlay={togglePlay}
            handleNextSong={handleNextSong}
            handlePreviousSong={handlePreviousSong}
          />
          <Audio isPlaying={isPlaying} song={songs[songIndex]} />
        </div>
        <div className="right-column">
          <ColorPicker />
        </div>
      </div>
    </div>
  );
}

export default App;
