import React, { FC, ReactNode } from "react";
import Link from "next/link";
import cls from "../../utils/classname";
import styles from "./Button.module.css";

interface ButtonProps {
    type: ButtonType;
    href?: string;
    onClick?: () => void;
    children?: ReactNode;
    disabled?: boolean;
    danger?: boolean;
}

export enum ButtonType {
    Button,
    Link,
}

/**
 * Простая кнопка. Может быть Link-кнопкой.
 * @param props
 */
const Button: FC<ButtonProps> = (props: ButtonProps) => {
    const { type, onClick, href, children, disabled, danger } = props;

    //                                  Heresy!
    if ( type === ButtonType.Button || disabled ) {
        return (
            <button className={cls([styles.button, danger ? styles.buttonDanger : null])} disabled={disabled} onClick={onClick}>{children}</button>
        );
    }
    else if ( type === ButtonType.Link ) {
        return (
            <Link href={href}><a className={cls([styles.button, danger ? styles.buttonDanger : null, styles.buttonLink])}>{children}</a></Link>
        );
    }
};

export default Button;