import React, { FC } from "react";
import styles from "./VideoPreview.module.css";
import IconButton, { IconButtonType } from "~/components/IconButton";
import Close from "~/public/icons/close.svg";

interface VideoPreviewProps {
    src: string;
    type: string;
    name: string;
    onDelete: (name: string) => void;
}

const VideoPreview: FC<VideoPreviewProps> = (props: VideoPreviewProps) => {
    const { src, type, name, onDelete } = props;

    return (
        <div className={styles.videoPreview}>
            <video width={270} height={180} controls={false}>
                <source src={src} type={type}/>
            </video>
            <div className={styles.deleteButton}>
                <IconButton type={IconButtonType.Button} Icon={Close} onClick={()=> { onDelete(name) } } />
            </div>
        </div>
    )
};

export default VideoPreview;