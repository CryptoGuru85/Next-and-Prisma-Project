import React, { FC } from "react";
import {Formik, Field, Form, FormikValues} from "formik";
import styles from "./ContentTextarea.module.css"



interface ContentTextareaProps {
  name: string;
  label: string;
}

/**
 * Большое поле для текста
 * @param props
 */


const ContentTextarea: FC<ContentTextareaProps> = (props:ContentTextareaProps) => {
  
const {name, label} = props

  return (
    <div className={styles.inputContainer}>
      <span className={styles.label}>{label}</span>
        <Field
          as="textarea"  
          name={name}
          className={styles.mainInput}
        />
    </div>

  );
};
  
  export default ContentTextarea;