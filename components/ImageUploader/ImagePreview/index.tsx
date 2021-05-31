import React, { FC, memo } from "react";
import IconButton, { IconButtonType } from "components/IconButton";
import Close from "public/icons/close.svg";

import styles from "./ImagePreview.module.css";

interface ImagePreviewProps {
    image: string;
    name: string;
    onDelete: (name: string) => void;
    onClick?: () => void;
}

const ImagePreview: FC<ImagePreviewProps> = (props: ImagePreviewProps) => {
    const { image, name, onDelete, onClick } = props;

    return (
        <div className={styles.mainContainer}>
            <img src={image} className={styles.imageContainer} alt={name} onClick={onClick}/>
            <div className={styles.icon}>
                <IconButton type={IconButtonType.Button} Icon={Close} onClick={() => {
                    onDelete(name)
                }}/>
            </div>
        </div>

    );
};

export default memo(ImagePreview);