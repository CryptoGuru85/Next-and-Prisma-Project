import React, { FC, SVGProps } from "react";
import cls from "~/utils/classname";
import Back from "~/public/icons/back.svg";

import styles from "./PopUpDetail.module.css";

interface PopUpDetailProps {
    isOpenedPopupDetail: boolean;
    closePopupDetail: () => void;
}

const PopUpDetail: FC<PopUpDetailProps> = (props: PopUpDetailProps) => {
    const { isOpenedPopupDetail, closePopupDetail } = props;

    return (
        <div className={cls([styles.mainContainer, isOpenedPopupDetail ? styles.active : null])}>
            <Back className={styles.backIcon} onClick={closePopupDetail} />
        </div>
    );
};

export default PopUpDetail;