import "./SongControlsView.css";
import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";

export default function SongControlsView(props) {
  return (
    <div className="song-controls-view">
      <div id="controls">
        <button onClick={props.handleNextSong}>
          <SkipPreviousIcon
            style={{ color: "grey" }}
            sx={{ fontSize: "32px" }}
          />
        </button>
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
        <button onClick={props.handleNextSong}>
          <SkipNextIcon style={{ color: "grey" }} sx={{ fontSize: "32px" }} />
        </button>
      </div>
      <div className="song-progress-container">
        <p className="timer-start">{props.curTime}</p>
        <div className="song-progress">
          <div className="song-expired" />
        </div>
        <p className="timer-end">{props.dur}</p>
      </div>
    </div>
  );
}
