import "./SongTitleView.css";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

export default function SongTitleView(props) {
  return (
    <div className="song-title-view">
      <MusicNoteIcon sx={{ color: "white", fontSize: "50px" }} />
      <div className="text">
        <p className="now-playing">Now playing...</p>
        <p className="song-title">
          {props.song.title} by {props.song.artist}
        </p>
      </div>
    </div>
  );
}
