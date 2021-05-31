import React, { FC, memo } from "react";
import cls from "~/utils/classname";
import styles from "./Switch.module.css";

interface SwitchProps {
    state: boolean;
    onClick?: (e: any) => void;
}

/**
 * Обычный переключатель состояния.
 * @param props
 */
const Switch: FC<SwitchProps> = (props:SwitchProps) => {
    const { state, onClick } = props;

    return (
        <div onClick={onClick} className={cls([styles.mainContainer, state ? styles.mainContainerActive : null])}>
            <div className={cls([styles.switch, state ? styles.switchActive : null])} />
        </div>
    );
};

export default memo(Switch);