import React, { FC } from "react";
import { Formik, Field, Form, FormikValues, useField } from "formik";
import styles from "./VideoLink.module.css";
import { useTranslation } from "next-i18next";



interface VideoLinkProps {
  name: string;
  label: string;
}





const VideoLink: FC<VideoLinkProps> = (props:VideoLinkProps) => {

const { t: tEvents } = useTranslation("events");

const {name, label} = props;


  return (
        <div className={styles.inputContainer}>
        <span className={styles.label}>{label}</span>    
            <Field
            name={name}
            className={styles.mainInput}
            />
        </div>
  );
};

export default VideoLink;