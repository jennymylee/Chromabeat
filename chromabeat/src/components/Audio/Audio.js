import { useRef, useEffect } from "react";

export default function Audio(props) {
  const audio = useRef(null);

  useEffect(() => {
    if (audio.current && props.isPlaying) {
      audio.current.currentTime = 0;
      audio.current.play();
    } else {
      audio.current.pause();
    }
  }, [props.isPlaying, props.song]); // play new song right away
  return <audio ref={audio} src={props.song.src} />;
}
