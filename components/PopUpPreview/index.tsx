import React, { FC } from "react";
import cls from "~/utils/classname";

import styles from "./PopUpPreview.module.css";

interface PopUpPreviewProps {
    active: boolean;
    children?: JSX.Element | JSX.Element[];
}

const PopUpPreview: FC<PopUpPreviewProps> = (props: PopUpPreviewProps) => {
    const { active, children } = props;

    return (
        <div className={cls([styles.mainContainer, active ? styles.active : null]) + ' popupwrap'}>
            {children}
        </div>
    );
};

export default PopUpPreview;