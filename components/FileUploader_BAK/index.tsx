import React, { FC, useEffect, useState } from "react";
import LoadingBar from "../LoadingBar";
import Upload from "~/public/icons/upload.svg";
import Check from "~/public/icons/check.svg";
import Close from "~/public/icons/close.svg";
import ImageGallery from "~/public/icons/imageGallery.svg";
import VideoIcon from "~/public/icons/video.svg";
import EventImgItem from "~/components/EventImg/EventImgItem";
import Icons from "./Icons";

import styles from "./FileUploader.module.css";
import VideoPreview from "~/components/VideoPreview";
import IconButton, { IconButtonType } from "~/components/IconButton";
import { ButtonType } from "~/components/Button";

import { useTranslation } from "next-i18next";

interface FileUploaderProps {
    fileType: FileType;
    label?: string;
    multiple?: boolean;
    onChange: (files: File[]) => void;
}

export enum FileType {
    Video,
    Image,
    Logo,
    Photo,
}

enum FileUploadStage {
    Waiting,
    Uploading,
    Uploaded,
}

const acceptFiles = {
    [FileType.Image]: "image/png, image/jpeg",
    [FileType.Logo]: "image/png, image/jpeg",
    [FileType.Video]: "video/mp4, video/webm",
    [FileType.Photo]: "image/png, image/jpeg",
}

/**
 * Загрузчик файлов
 * @param props
 */
const FileUploader: FC<FileUploaderProps> = (props: FileUploaderProps) => {
    const { fileType, multiple, onChange, label } = props;
    const [stage, setStage] = useState<FileUploadStage>(FileUploadStage.Waiting);
    const [percent, setPercent] = useState(0);
    const [files, setFiles] = useState([]);

    const { t: tEvents } = useTranslation("events");

    useEffect( () => {
        if ( stage !== FileUploadStage.Uploading ) return;
        if ( percent >= 100 ) {
            setStage(FileUploadStage.Uploaded);
            setTimeout(() => {
                setStage(FileUploadStage.Waiting);
            }, 5000);
            return;
        }
    }, [stage, percent]);

    const prevent = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleUpload = (e) => {
        console.log('target', e.target)
        setStage(FileUploadStage.Uploading);
        prevent(e);
        const dt = e.dataTransfer || e.target;
        if ( dt ) {
            let files = Array.from(dt.files);
            if ( !multiple ) {
                files = files.filter((_, i) => i === 0);
            }
            onChange(dt.files);

            const promises = files.map(( file: File, i ) => {
                let res;
                let p = new Promise((resolve) => {
                    res = resolve
                });

                if ( fileType === FileType.Image || fileType === FileType.Logo || fileType === FileType.Photo ) {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => {
                        const newFile = {
                            src: reader.result,
                            name: file.name,
                        };
                        res(newFile);
                    };
                    return p;
                }
                if ( fileType === FileType.Video ) {
                    const newFile = {
                        src: URL.createObjectURL(file),
                        name: file.name,
                        type: file.type,
                    }
                    res(newFile);
                    return p;
                }
            });
            Promise.all(promises).then((newFiles) => {
                if ( !multiple )
                    setFiles(newFiles);
                else
                    setFiles(oldFiles=> [...oldFiles, ...newFiles]);
            });

        }
    };

    const onDelete = (name) => {
        setFiles(files.filter((file) => file.name !== name));
    };

    if ( fileType === FileType.Image )
        return (
            <div className={styles.mainContainer}>
                <span>{label}</span>
                <div>
                    <div className={styles.filePreview}>
                        {
                            files.map((file, i) => {
                                return <EventImgItem image={file.src} name={file.name} onDelete={onDelete} key={file.name} />
                            })
                        }
                    </div>
                    <label htmlFor="file-upload-image" className={styles.uploadMainContainer} draggable={true}
                           onDragEnter={prevent}
                           onDragOver={prevent}
                           onDrop={handleUpload}>
                        <div className={styles.contentContainer}>
                            <Icons />
                            <div className={styles.statusContainer}>
                                <div className={styles.uploadContainer}>
                                    {
                                        stage === FileUploadStage.Waiting ?
                                            <>
                                                <span>{tEvents("EVENT_FILE_UPLOAD")}</span>
                                                <Upload className={styles.uploadIcon} />
                                            </>
                                        :
                                        stage === FileUploadStage.Uploading || stage === FileUploadStage.Uploaded ?
                                            <>
                                                <LoadingBar percent={percent}/>
                                                <div className={stage === FileUploadStage.Uploaded ? styles.uploadedIcon : styles.uploadedIconHidden}>
                                                    <Check/>
                                                </div>
                                            </>
                                        :
                                            <></>
                                    }
                                </div>
                            </div>
                        </div>
                    </label>

                    <input className={styles.fileUpload}
                           multiple={multiple}
                           id="file-upload-image"
                           type="file"
                           accept="image/png, image/jpeg"
                           onChange={handleUpload}/>
                </div>
            </div>
        );
    if ( fileType === FileType.Video )
        return (
            <div className={styles.mainContainer}>
                <span>{label}</span>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <div className={styles.filePreview}>
                        {
                            files.map((file, i) => {
                                return <VideoPreview src={file.src} type={file.type} name={file.name} onDelete={onDelete} key={file.name}/>
                            })
                        }
                    </div>
                    <label htmlFor="file-upload-video" className={styles.videoUploader} draggable={true}
                           onDragEnter={prevent}
                           onDragOver={prevent}
                           onDrop={handleUpload}
                    >
                        <VideoIcon />
                    </label>
                    <input className={styles.fileUpload}
                           multiple={multiple}
                           id="file-upload-video"
                           type="file"
                           accept="image/png, image/jpeg"
                           onChange={handleUpload}/>
                </div>
            </div>
        );
    console.log("SDSA", files)
    if ( fileType === FileType.Logo )
        return (
            <div className={styles.mainContainer}>
                <span>{label}</span>
                <div className={styles.logoUploaderContainer}>
                    <div className={styles.logoContainer}>
                        {
                            files[0] ?
                                <img className={styles.logoImage} src={files[0].src} alt={files[0].name} />
                            :
                                <ImageGallery/>
                        }
                        <div className={styles.deleteButton}>
                            <IconButton type={IconButtonType.Button} disabled={!files[0]} onClick={()=>onDelete(files[0].name)} Icon={Close} />
                        </div>
                    </div>
                    <label htmlFor="file-upload-logo" className={styles.uploadLogoButton}
                           draggable={true}
                           onDragEnter={prevent}
                           onDragOver={prevent}
                           onDrop={handleUpload} >
                        <Upload />
                    </label>
                    <input className={styles.fileUpload}
                            multiple={false}
                            id="file-upload-logo"
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={handleUpload}/>
                </div>
            </div>
        );
    if (fileType === FileType.Photo)
        return (
            <div className={styles.photoMainContainer}>
            <span>{label}</span>
            <div className={styles.photoUploaderContainer}>
                <div className={styles.photoContainer}>
                    {
                        files[0] ?
                            <img className={styles.photoImage} src={files[0].src} alt={files[0].name} />
                        :
                        <label 
                        draggable={true}
                        onDragEnter={prevent}
                        onDragOver={prevent}
                        onDrop={handleUpload}
                        >
                            <ImageGallery/>
                        </label>
                    }
                    <div className={styles.deletePhotoButton}>
                        <IconButton type={IconButtonType.Button} disabled={!files[0]} onClick={()=>onDelete(files[0].name)} Icon={Close} />
                    </div>
                </div>
                <label htmlFor="file-upload-logo" className={styles.uploadLogoButton}
                       draggable={true}
                       onDragEnter={prevent}
                       onDragOver={prevent}
                       onDrop={handleUpload} >
                    <Upload />
                </label>
                <input className={styles.fileUpload}
                        multiple={false}
                        id="file-upload-logo"
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleUpload}/>
            </div>
        </div>
        );
};

export default FileUploader;