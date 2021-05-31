import React, { FC } from "react";
import styles from "./VideoOverwiev.module.css";
import VideoOverwievItem from "./VideoOverwievItem";



interface VideoOverwievProps {
    label: string;
}





const VideoOverwiev: FC<VideoOverwievProps> = (props:VideoOverwievProps) => {
  
    const {label} = props

  return (
    <div className={styles.VideoContainer}>
        <span className={styles.label}>{label}</span>
        <div className={styles.mainVideo}>
            <VideoOverwievItem/>
        </div>
    </div>

  );
};
  
  export default VideoOverwiev;