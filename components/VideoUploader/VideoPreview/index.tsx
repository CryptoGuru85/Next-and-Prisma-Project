import React, { FC, memo, useRef, useEffect } from "react";
import IconButton, { IconButtonType } from "components/IconButton";
import Close from "public/icons/close.svg";
import VideoThumbnail from "react-video-thumbnail";

import styles from "./VideoPreview.module.css";

interface VideoPreviewProps {
    type: string;
    src: string;
    name: string;
    onClick?: () => void;
    onDelete: (name: string) => void;
}

const VideoPreview: FC<VideoPreviewProps> = (props: VideoPreviewProps) => {
    const { src, type, name, onDelete, onClick } = props;
    return (
        <div className={styles.mainContainer}>
            <div className={styles.videoContainer} onClick={onClick}>
                {/*<video disablePictureInPicture width="100%" height="100%" muted={true} controls={false} autoPlay={false} >*/}
                {/*    <source type={type} src={src} />*/}
                {/*</video>*/}

                <VideoThumbnail videoUrl={src} width={270} height={180} />
            </div>
            <div className={styles.icon}>
                <IconButton type={IconButtonType.Button} Icon={Close} onClick={() => {
                    onDelete(name)
                }}/>
            </div>

        </div>

    );
};

export default memo(VideoPreview);