import React, { FC, SVGProps } from "react";
import Link from "next/link";
import styles from "./IconButton.module.css";

export enum IconButtonType {
    Button,
    Link,
}

interface IconButtonProps {
    animated?: boolean;
    label?: string;
    type: IconButtonType;
    disabled?: boolean;
    href?: string;
    onClick?: (e: any) => void;
    Icon: FC<SVGProps<SVGSVGElement>>;
}

/**
 * Кнопка-иконка. Может быть Link-кнопкой.
 * @param props
 */
const IconButton: FC<IconButtonProps> = (props: IconButtonProps) => {
    const { type, label, href, onClick, Icon, disabled, animated } = props;

    return (
        <>
        {
            type === IconButtonType.Button ?
                <div className={styles.mainContainer}
                    onClick={(e) => {
                        if ( !disabled )
                            onClick(e);
                    }}>
                    <div className={styles.iconContainer}>
                        <Icon className={animated ? styles.icon : ""} />
                    </div>
                    {
                        label ?
                            <span className={styles.label}>{label}</span>
                            : <></>
                    }
                </div>
            :
                <Link href={href}>
                    <a className={styles.mainContainer}>
                        <div className={styles.iconContainer}>
                            <Icon className={animated ? styles.icon : ""} />
                        </div>
                        {
                            label ?
                                <span className={styles.label}>{label}</span>
                            : <></>
                        }
                    </a>
                </Link>
        }
        </>
    );
};

export default IconButton;