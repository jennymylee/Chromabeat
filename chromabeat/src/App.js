import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Record from "./components/Record/Record";
import SongTitleView from "./components/SongTitleView/SongTitleView";
import SongControlsView from "./components/SongControlsView/SongControlsView";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  return (
    <div className="App">
      <Navbar />
      <div className="components">
        <div className="left-column">
          <SongTitleView />
        </div>
        <div className="middle-column">
          <Record
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            togglePlay={togglePlay}
          />
          <SongControlsView
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            togglePlay={togglePlay}
          />
        </div>
        <div className="right-column"></div>
      </div>
    </div>
  );
}

export default App;
