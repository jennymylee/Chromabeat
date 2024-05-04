import "./Record.css";
import React, { useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

export default function Record(props) {
  // const [isPlaying, setIsPlaying] = useState(false);

  // const togglePlay = () => {
  //   setIsPlaying(!isPlaying);
  // };

  return (
    <div className="Record">
      <div id="box">
        <div id="shadow">
          <div
            id="vinyl"
            className={props.isPlaying ? "spin-animation" : ""}
            onClick={props.togglePlay}
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
          <button className="record-button" onClick={props.togglePlay}>
            {props.isPlaying ? (
              <PauseIcon className="pause" sx={{ fontSize: "32px" }} />
            ) : (
              <PlayArrowIcon className="play" sx={{ fontSize: "32px" }} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
