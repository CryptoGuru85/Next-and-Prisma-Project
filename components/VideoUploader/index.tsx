import React, { FC, memo, useEffect, useState } from "react";
import { CSSTransition, SwitchTransition, TransitionGroup } from "react-transition-group";
import { useTranslation } from "next-i18next";

import Modal from "react-modal";
import VideoPreview from "./VideoPreview";

import Icons from "./Icons";
import Upload from "~/public/icons/upload.svg";

import { PreviewFile, UploaderProps } from "~/components/FileUploader/types";
import MediaOverview, { MediaType } from "~/components/MediaOverview";

import styles from "./VideoUploader.module.css";

Modal.setAppElement("#__next")

const VideoUploader:FC<UploaderProps> = (props: UploaderProps) => {
    const { label, files, setFiles, handleUpload, openDialog } = props;
    const { t } = useTranslation("events");

    const [previewFiles, setPreviewFiles] = useState<PreviewFile[]>([]);
    const [toggleModal, setToggleModal] = useState(false);

    useEffect(() => {
        setPreviewFiles(files.map(( file: File ) => {
            const newFile: PreviewFile = {
                src: URL.createObjectURL(file),
                name: file.name,
                type: file.type,
            };
            return newFile;
        }));
    }, [files]);

    const prevent = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const onDelete = (name) => {
        setFiles(files.filter( file => file.name !== name ));
    };

    return (
        <div className={styles.mainContainer}
             draggable={true}
             onDragOver={prevent}
             onDragEnter={prevent}
             onDrop={handleUpload}>
            <div className={styles.title}>
                <span>{label}</span>
            </div>
            <SwitchTransition mode="out-in">
                <CSSTransition key={!!previewFiles.length}
                               addEndListener={(node, done) => {
                                   node.addEventListener("transitionend", done, false);
                               }}
                               classNames="slide-fade">
                    {
                        !previewFiles.length ?
                            <div className={styles.uploaderContainer}
                                 onClick={openDialog}>
                                <Icons/>
                                <div className={styles.uploaderText}>
                                    <span>{t("EVENT_VIDEO_UPLOAD")}</span>
                                    <Upload className={styles.uploaderTextIcon}/>
                                </div>
                            </div>
                            :
                            <TransitionGroup className={styles.previewContainer}>
                                {
                                    previewFiles.map((file, i) => {
                                        return (
                                            <CSSTransition key={file.name} timeout={500} classNames="slide-list-item">
                                                <VideoPreview type={file.type} src={file.src} name={file.name} onDelete={onDelete} onClick={()=>setToggleModal(!toggleModal)}/>
                                            </CSSTransition>
                                        );
                                    })
                                }
                            </TransitionGroup>
                    }
            </CSSTransition>
            </SwitchTransition>
            <Modal isOpen={toggleModal}
                   className={styles.modalContainer}
                   onRequestClose={() => setToggleModal(false)}
                   shouldCloseOnOverlayClick={true}
                   shouldCloseOnEsc={true}>
                <MediaOverview type={MediaType.Video} files={previewFiles} setFiles={setPreviewFiles} setToggleModal={setToggleModal} />
            </Modal>
        </div>
    );
};

export default memo(VideoUploader);