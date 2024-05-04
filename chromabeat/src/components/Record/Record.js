import "./Record.css";
import React, { useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

export default function Record() {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="Record">
      <div id="box">
        <div id="shadow">
          <div
            id="vinyl"
            className={isPlaying ? "spin-animation" : ""}
            onClick={togglePlay}
          >
            <div id="inner">
              <div id="label">
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/5/57/Laufey_-_Everything_I_Know_About_Love.png"
                  alt="Album Cover"
                />
              </div>
            </div>
          </div>
          <button className="record-button" onClick={togglePlay}>
            {isPlaying ? (
              <PauseIcon sx={{ fontSize: "32px" }} />
            ) : (
              <PlayArrowIcon sx={{ fontSize: "32px" }} />
            )}
          </button>
        </div>
      </div>
      <div id="controls">
        <button id="play" onClick={togglePlay}>
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </button>
      </div>
    </div>
  );
}
