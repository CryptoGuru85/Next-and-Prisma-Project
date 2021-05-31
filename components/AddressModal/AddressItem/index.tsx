import React, { FC } from "react";
import {Formik, Field, Form, FormikValues} from "formik";
import styles from "./AddressItem.module.css";

interface AddressItemProps {
  name: string;
  label: string;
  secondName: string;
  onChangeFirst: (e) => void;
  onChangeSecond: (e) => void;
}

const AddressItem: FC<AddressItemProps> = (props:AddressItemProps) => {
  
const {name, secondName, label, onChangeFirst, onChangeSecond} = props

  return (
      <div className={styles.mainContainer}>
        <span className={styles.label}>{label}</span>
        <div className={styles.inputContainer}>
            <div className={styles.inputOne}>
              <Field
              name={name}
              className={styles.mainInput}
              onChange={onChangeFirst}
              />
            </div>
            <div className={styles.inputTwo}>
              <Field
              name={secondName}
              className={styles.mainInput}
              onChange={onChangeSecond}
              />
            </div>
        </div>
    </div>

  );
};
  
  export default AddressItem;