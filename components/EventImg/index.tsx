import React, { FC } from "react";
import styles from "./EventImg.module.css"
import FileUploader, { FileType } from "~/components/FileUploader_BAK";


interface EventImgProps {
    label: string;
}




const EventImg: FC<EventImgProps> = (props:EventImgProps) => {
  
    const {label} = props

  return (
    <div className={styles.contentContainer}>
      <div className={styles.picturesContainer}>
          <span className={styles.label}>{label}</span>
          <div className={styles.mainContainer}>
            <div className={styles.eventImg}>
            </div>
              <div className={styles.uploadContainer}>
                <FileUploader fileType={FileType.Image} onChange={()=>{}}/>
              </div>
          </div>
      </div>
    </div>
  );
};
  
  export default EventImg;