import React, { FC, memo, useEffect, useState } from "react";
import Image from "~/public/icons/imageGallery.svg";
import styles from "./LogoUploader.module.css";
import { PreviewFile, UploaderProps } from "~/components/FileUploader/types";
import IconButton, { IconButtonType } from "~/components/IconButton";
import Upload from "~/public/icons/upload.svg";
import Close from "~/public/icons/close.svg";

const LogoUploader: FC<UploaderProps> = (props: UploaderProps) => {
    const { files, setFiles, label, openDialog } = props;

    const [logo, setLogo] = useState<PreviewFile>(null);

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
            setLogo(newFile)
        };
    }, [files]);

    const deleteLogo = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setFiles( [] );
        setLogo(null);
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.title}>
                <span>{label}</span>
            </div>
            <div className={styles.logoContainer} onClick={openDialog}>
                <div className={styles.logoPreview}>
                    <Image className={styles.imageIcon} />
                    <Upload className={styles.uploadIcon} />
                    {
                        logo ?
                            <img src={logo.src} alt={logo.name} />
                        :
                            <></>
                    }
                </div>
                {
                    logo ?
                        <div className={styles.deleteButton}>
                            <IconButton type={IconButtonType.Button} Icon={Close} onClick={deleteLogo}/>
                        </div>
                    :
                        <></>
                }
            </div>
        </div>
    );
};

export default memo(LogoUploader);