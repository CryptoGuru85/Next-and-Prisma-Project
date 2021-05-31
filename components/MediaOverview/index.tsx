import React, { FC, useEffect, useState } from "react";
import VideoThumbnail from "react-video-thumbnail";
import { PreviewFile } from "~/components/FileUploader/types";
import Play from "~/public/icons/play.svg";
import Upload from "~/public/icons/down-arrow-1.svg";
import Trash from "~/public/icons/delete.svg";
import Plus from "~/public/icons/plus-blue.svg";
import styles from "./MediaOverview.module.css";
import IconButton, { IconButtonType } from "~/components/IconButton";

export enum MediaType {
    Picture,
    Video,
}

interface MediaOverviewProps {
    type: MediaType;
    current?: PreviewFile;
    files: PreviewFile[];
    setFiles: (files: PreviewFile[]) => void;
    setToggleModal: (toggle: boolean) => void;
}

const MediaOverview: FC<MediaOverviewProps> = (props: MediaOverviewProps) => {
    const { type, current, files, setFiles, setToggleModal } = props;
    const [currentMedia, setCurrentMedia] = useState<PreviewFile>(current || files[0]);

    const RenderMainPreview = () => {
        if ( currentMedia ) {
            if ( type === MediaType.Video ) {
                return (
                    <video key={currentMedia.src} controls={true} width={672} height={428} >
                        <source src={currentMedia.src} type={currentMedia.type}/>
                    </video>
                );
            }

            if ( type === MediaType.Picture ) {
                return (
                    <img src={currentMedia.src} alt={currentMedia.name} />
                );
            }
        }
    };

    useEffect(() => {
        if ( !files.length ) {
            setToggleModal(false);
            return;
            // HAHAHAHAHA
        }
        setCurrentMedia(files[0]);
    }, [files]);

    const RenderPreviews = () => {
        return files.filter((_) => _.src !== currentMedia.src).map((file) => {
            if ( type === MediaType.Video ) {
                return (
                    <div className={styles.thumbnail} onClick={() => setCurrentMedia(file)} key={file.src}>
                        <VideoThumbnail width={158} height={105} videoUrl={file.src}/>
                        <Play className={styles.playIcon} />
                    </div>
                );
            }

            if ( type === MediaType.Picture ) {
                return (
                    <div className={styles.thumbnail} onClick={() => setCurrentMedia(file)} key={file.src}>
                        <img src={file.src} alt={file.name}/>
                    </div>
                );
            }
        });
    };

    const deleteFile = () => {
        setFiles( files.filter( file => file.src !== currentMedia.src ) );
    };

    return (
       <div className={styles.mainContainer}>
            <div className={styles.previewContainer}>
                <div className={styles.mainPreview}>
                    { RenderMainPreview() }
                </div>
                <div className={styles.previews}>
                    { RenderPreviews() }
                </div>
            </div>
           <div className={styles.controlContainer}>
               <div className={styles.controlLeft}>
                   <IconButton type={IconButtonType.Button} Icon={Upload} onClick={()=>{}} />
                   <IconButton type={IconButtonType.Button} Icon={Trash} onClick={deleteFile} />
                   <IconButton type={IconButtonType.Button} Icon={Plus} onClick={()=>{}} />
               </div>
           </div>
       </div>
    );
};

export default MediaOverview;