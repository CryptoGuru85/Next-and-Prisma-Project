import React, { FC, memo, useEffect, useState } from "react";
import Image from "~/public/icons/imageGallery.svg";
import styles from "./PhotoUploader.module.css";
import { PreviewFile, UploaderProps } from "~/components/FileUploader/types";
import IconButton, { IconButtonType } from "~/components/IconButton";
import Upload from "~/public/icons/upload.svg";
import Close from "~/public/icons/close.svg";

const PhotoUploader: FC<UploaderProps> = (props: UploaderProps) => {
    const { files, setFiles, label, openDialog, handleUpload } = props;

    const [photo, setPhoto] = useState<PreviewFile>(null);

    useEffect(() => {
        const file = files[0];
        if ( !file ) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const newFile: PreviewFile = {
                src: reader.result as string,
                name: file.name,
            };
            setPhoto(newFile)
        };
    }, [files]);

    const deletePhoto = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setFiles( [] );
        setPhoto(null);
    };

    const prevent = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.title}>
                <span>{label}</span>
            </div>
            <div className={styles.logoContainer}
                 draggable={true}
                 onClick={openDialog}
                 onDragOver={prevent}
                 onDragEnter={prevent}
                 onDrop={handleUpload}>
                <div className={styles.logoPreview}>
                    <Image className={styles.imageIcon} />
                    <Upload className={styles.uploadIcon} />
                    {
                        photo ?
                            <img src={photo.src} alt={photo.name} />
                        :
                            <></>
                    }
                </div>
                {
                    photo ?
                        <div className={styles.deleteButton}>
                            <IconButton type={IconButtonType.Button} Icon={Close} onClick={deletePhoto}/>
                        </div>
                    :
                        <></>
                }
            </div>
        </div>
    );
};

export default memo(PhotoUploader);