import React, { FC } from "react";
import { IconProps } from "~/components/icons/icon";
import styles from "./Search.module.css";

const Search: FC<IconProps> = (props: IconProps) => {
    const { color, width, height } = props;

    return (
        <svg className={styles.mainContainer} width={width || "17"} height={height || "17"} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle className={styles.content} cx="7.5" cy="7.5" r="6.5" stroke="#fff" stroke-width="2"/>
            <path className={styles.content} d="M12.5 12.5L16 16" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
        </svg>
    );
};

export default Search;