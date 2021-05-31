import React, { FC } from "react";
import {Formik, Field, Form, FormikValues} from "formik";
import styles from "./SocialItem.module.css";
import Button, { ButtonType } from "~/components/Button";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface SocialItemProps {
  name: string;
  label: string;
}

const SocialItem: FC<SocialItemProps> = (props:SocialItemProps) => {

  const { t: tEvents } = useTranslation("events");
  
  const {name, label} = props

  return (
      <div className={styles.mainContainer}>
        <span className={styles.label}>{label}</span>
        <div className={styles.inputContainer}>
            <Field
              name={name}
              className={styles.mainInput}
            />
            <div className={styles.actions}>
                <div className={styles.actionContainer}>
                    <Button type={ButtonType.Button} danger={false}>{tEvents("EVENT_ACTION_SING_IN")}</Button>
                </div>
            </div>
        </div>
    </div>
  );
};
  
export default SocialItem;