import React, { FC } from "react";
import {Formik, Field, Form, FormikValues} from "formik";
import styles from "./Input.module.css"



interface EventFormProps {
  name: string;
  label: string;
}


/**
 * Поле для текста
 * @param props
 */

const InputForm: FC<EventFormProps> = (props:EventFormProps) => {
  
  const {name, label} = props

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
  
  export default InputForm;