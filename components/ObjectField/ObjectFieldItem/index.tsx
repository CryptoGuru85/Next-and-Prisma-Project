import React, { FC, useState } from "react";
import { Formik, Field, Form, FormikValues } from "formik";
import styles from "./ObjectFieldItem.module.css";
import cls from "~/utils/classname";
import ValuteSelect from "~/components/ValuteSelect";


interface ObjectFieldItemProps {
  name: string;
  label: string;
}



const ObjectFieldItem: FC<ObjectFieldItemProps> = (props: ObjectFieldItemProps) => {

  const { name, label } = props;





  return (
    <div className={styles.inputContainer}>
      <div className={cls([styles.field, styles.fieldCheck])} >
      </div>
      <span className={styles.picker}>
        <ValuteSelect label={label} name={name}/>
      </span>
      <Field
        name={name}
        className={styles.mainInput}
      />
    </div>

  );
};

export default ObjectFieldItem;