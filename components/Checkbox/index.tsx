import React, { FC } from "react";
import Check from "~/public/icons/check-no-border.svg";
import styles from "./Checkbox.module.css";

interface CheckboxProps {
    active: boolean;
    onClick: (e) => void;
    label?: string;
}

const Checkbox: FC<CheckboxProps> = (props: CheckboxProps) => {
    const { active, onClick, label } = props;

    return (
        <div className={styles.mainContainer} onClick={onClick}>
            <div className={styles.iconContainer}>
                {
                    active ?
                        <Check/>
                    :
                        <></>
                }
            </div>
            <div className={styles.labelContainer}>
                <span>{label}</span>
            </div>
        </div>
    );
};

export default Checkbox;