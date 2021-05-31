import React, { FC, memo, useEffect, useState } from "react";
import Modal from "react-modal";
import { SwitchTransition, CSSTransition, TransitionGroup } from "react-transition-group";
import { useTranslation } from "next-i18next";

import ImagePreview from "~/components/ImageUploader/ImagePreview";
import Icons from "./Icons";
import Upload from "~/public/icons/upload.svg";

import styles from "./ImageUploader.module.css";
import { PreviewFile, UploaderProps } from "~/components/FileUploader/types";
import MediaOverview, { MediaType } from "~/components/MediaOverview";
import VideoPreview from "~/components/VideoUploader/VideoPreview";


const ImageUploader:FC<UploaderProps> = (props: UploaderProps) => {
    const { label, files, setFiles, handleUpload, openDialog } = props;
    const { t } = useTranslation("events");

    const [previewFiles, setPreviewFiles] = useState<PreviewFile[]>([]);
    const [toggleModal, setToggleModal] = useState(false);

    useEffect(() => {
        const promises: Promise<PreviewFile>[] = files.map(( file: File ) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    const newFile: PreviewFile = {
                        src: reader.result as string,
                        name: file.name,
                    };
                    resolve(newFile);
                };
            });
        });
        Promise.all(promises).then((newFiles: PreviewFile[]) => {
            setPreviewFiles(newFiles);
        });
    }, [files]);

    const prevent = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const onDelete = (name) => {
        setFiles(files.filter( file => file.name !== name ));
    }

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
                                    <span>{t("EVENT_PICTURE_UPLOAD")}</span>
                                    <Upload className={styles.uploaderTextIcon}/>
                                </div>
                            </div>
                            :
                            <TransitionGroup className={styles.previewContainer}>
                                {
                                    previewFiles.map((file, i) => {
                                        return (
                                            <CSSTransition key={file.name} timeout={500} classNames="fade-list-item">
                                                <ImagePreview image={file.src} name={file.name} onDelete={onDelete} onClick={()=>setToggleModal(!toggleModal)}/>
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
                <SwitchTransition mode="out-in">
                    <CSSTransition key={!toggleModal}
                                   addEndListener={(node, done) => {
                                       node.addEventListener("transitionend", done, false);
                                   }}
                                   classNames="fade-list-item">
                        <MediaOverview type={MediaType.Picture} files={previewFiles} setFiles={setPreviewFiles} setToggleModal={setToggleModal} />
                    </CSSTransition>
                </SwitchTransition>
            </Modal>
        </div>
    );
};

export default memo(ImageUploader);