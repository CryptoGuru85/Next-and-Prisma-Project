import React, { FC } from "react";
import cls from "~/utils/classname";

import styles from "./PopUp.module.css";

interface PopUpProps {
    active: boolean;
    children?: JSX.Element | JSX.Element[];
}

const PopUp: FC<PopUpProps> = (props: PopUpProps) => {
    const { active, children } = props;

    return (
        <div className={cls([styles.mainContainer, active ? styles.active : null]) + ' menuwrap'}>
            {children}
        </div>
    );
};

export default PopUp;