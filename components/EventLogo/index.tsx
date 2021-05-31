import React, { FC } from "react";
import styles from "./EventLogo.module.css";



interface TourProps {
  image: string;  
  label: string;
}




const Tour: FC<TourProps> = (props:TourProps) => {
  
  const { label, image} = props

  return (
    <div className={styles.inputContainer}>
      <span className={styles.label}>{label}</span>
      <div className={styles.actionContainer}>
        <img src={image} className={styles.UploadImg}/>
      </div>
      <div className={styles.icon}>
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"
            className={styles.deliteIcon}
            >
            <g clip-path="url(#clip0)">
                <path
                d="M25.4558 25.456C30.1421 20.7697 30.1421 13.1717 25.4558 8.48542C20.7696 3.79913 13.1716 3.79913 8.48528 8.48542C3.79899 13.1717 3.79899 20.7697 8.48528 25.456C13.1716 30.1423 20.7696 30.1423 25.4558 25.456Z"
                    fill="#EB5757"/>
                <path d="M12.8975 12.8978L21.3827 21.383" stroke="white" stroke-width="2" stroke-miterlimit="10"
                    stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21.2128 12.728L12.7275 21.2133" stroke="white" stroke-width="2" stroke-miterlimit="10"
                    stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            </svg>
        </div>
    </div>

  );
};
  
  export default Tour;