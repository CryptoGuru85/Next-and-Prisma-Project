import React, { CSSProperties, FC } from "react";
import styles from "./ActivityIndicator.module.css";

interface ActivityIndicatorProps {
    direction?: string;
    text?: string;
    size?: number;
    thickness?: number;
    color?: string;
}
const DEFAULT_SIZE = 48;

/**
 * Индикатор загрузки
 * @param props
 * */
const ActivityIndicator: FC<ActivityIndicatorProps> = (props:ActivityIndicatorProps) => {
    const { text, size, thickness, direction, color } = props;

    const containerStyles = {
        flexDirection: direction || "column",
    };

    return (
        <div className={styles.mainContainer} style={containerStyles as CSSProperties}>
            <div className={styles.indicator} style={{
                width: size || DEFAULT_SIZE,
                height: size || DEFAULT_SIZE,
                borderWidth: thickness,
                borderColor: `${color} transparent ${color} transparent`,
            }} />
            <span style={{
                marginLeft: direction === "row" ? 16 : 0,
                color
            }}>{text}</span>
        </div>
    );
};

export default ActivityIndicator;