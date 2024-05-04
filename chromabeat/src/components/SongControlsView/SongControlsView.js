import "./SongControlsView.css";
import React, { useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";

export default function SongControlsView(props) {
  return (
    <div className="song-controls-view">
      <div id="controls">
        <SkipPreviousIcon
          className="skip-prev"
          style={{ color: "grey" }}
          sx={{ fontSize: "32px" }}
        />
        <button id="play" onClick={props.togglePlay}>
          {props.isPlaying ? (
            <PauseIcon style={{ color: "grey" }} sx={{ fontSize: "32px" }} />
          ) : (
            <PlayArrowIcon
              style={{ color: "grey" }}
              sx={{ fontSize: "32px" }}
            />
          )}
        </button>
        <SkipNextIcon
          className="skip-next"
          style={{ color: "grey" }}
          sx={{ fontSize: "32px" }}
        />
      </div>
      <div className="song-progress-container">
        <p className="timer-start">0:38</p>
        <div className="song-progress">
          <div className="song-expired" />
        </div>
        <p className="timer-end">3:14</p>
      </div>
    </div>
  );
}
