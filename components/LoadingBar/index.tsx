import React, { FC } from "react";
import cls from "~/utils/classname";
import styles from "./LoadingBar.module.css";

interface LoadingBarProps {
    percent: number;
}

/**
 * Загрузочный бар
 * @param props
 */
const LoadingBar: FC<LoadingBarProps> = (props: LoadingBarProps) => {
    const { percent } = props;
    return (
        <div className={styles.mainContainer}>
            <div style={{ width: (String(percent) || "0") + "%" }} className={cls([styles.barBackground, percent >= 100 ? styles.barBackgroundComplete : null])}/>
        </div>
    );
};

export default LoadingBar;