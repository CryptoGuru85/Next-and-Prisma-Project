import React, { FC } from "react";
import IconButton, { IconButtonType } from "~/components/IconButton";
import Delete from "~/public/icons/delete.svg";
import Load from "~/public/icons/player icons/down-arrow.svg";
import ArrowLeft from "~/public/icons/player icons/arrow-blue.svg"
import ArrowRight from "~/public/icons/player icons/arrow-blue-right.svg";
import Puls from "~/public/icons/player icons/plus 14.svg";
import styles from "./PlayerImg.module.css";

interface PlayerImgProps {
    image: string;
    name: string;
    onDelete: (name: string) => void;
}


const PlayerImg: FC<PlayerImgProps> = (props:PlayerImgProps) => {

    const {image, name, onDelete} = props;

  return (
    <div className={styles.mainContainer}>
        <div className={styles.contentContainer}>
            <div className={styles.mainPlayer}>
            <img src="/images/WeAreTheNight.jpg" className={styles.mainImg} alt={name}/>
            </div>
            <div className={styles.secondPlayer}>
                <img src="/images/WeAreTheNight.jpg" className={styles.secondImg} alt={name}/>
            </div>
        </div>
        <div className={styles.playerSettings}>
            <div className={styles.settings}>
                <IconButton type={IconButtonType.Button} Icon={Load}/>
                <IconButton type={IconButtonType.Button}  Icon={Delete}/>
                <IconButton type={IconButtonType.Button} Icon={Puls}/>
            </div>
            <div className={styles.settings}>
                <IconButton type={IconButtonType.Button} Icon={ArrowLeft}/>
                <IconButton type={IconButtonType.Button} Icon={ArrowRight}/>
            </div>
        </div>
    </div>

  );
};
  
  export default PlayerImg;