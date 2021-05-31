import React, { FC } from "react";
import IconButton, { IconButtonType } from "~/components/IconButton";
import Close from "~/public/icons/close.svg";
import styles from "./EventImgItem.module.css"


interface EventImgItemProps {
  image: string;
  name: string;
  onDelete: (name: string) => void;
}


const EventImgItem: FC<EventImgItemProps> = (props:EventImgItemProps) => {

  const {image, name, onDelete} = props;
  

  return (
    <div className={styles.imgContainer}>   
        <div className={styles.mainImg}>
            <img src={image} className={styles.UploadImg} alt={name}/>
        </div>
        <div className={styles.icon}>
            <IconButton type={IconButtonType.Button} Icon={Close} onClick={()=> { onDelete(name) } } />
        </div>
    </div>

  );
};
  
  export default EventImgItem;