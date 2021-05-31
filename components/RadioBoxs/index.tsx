import React, { FC } from "react";
import styles from "./RadioBox.module.css";
import {Radio} from 'antd';

interface RadioBoxsProps {
  label: string;
  contents: string[];
  defaultValue: number;
  onChange: (e) => void;
}

const RadioBoxs: FC<RadioBoxsProps> = (props:RadioBoxsProps) => {
  
  const {onChange, label, contents, defaultValue} = props;

  return (
    <div className={styles.region}>
      <h3>{label}</h3>
      <Radio.Group defaultValue={contents[defaultValue]} onChange={onChange}>
        {contents.map((content, i) => {
            return <Radio className="date-checkbox" value={content}><p>{content}</p></Radio>
        })}
      </Radio.Group>
    </div>
  );
};

  export default RadioBoxs;