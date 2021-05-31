import React, { FC, useState } from 'react';
import styles from "./QrCode.module.css";
import Generate from "~/public/icons/generate.svg";
import Upload from "~/public/icons/down-arrow-qr.svg"


interface QrCodeProps {

}



const QrCode: FC<QrCodeProps> = (props: QrCodeProps) => {

    return (
        <div className={styles.mainContainer}>
            <div className={styles.actionContainer}>
                <div className={styles.qrButtonContainer}>
                        <Generate />
                        <h1>Generate</h1>
                </div>
                <div className={styles.qrButtonContainer}>
                    <Upload />
                    <h1>Upload</h1>
                </div>
            </div>
        </div>
    )

}



export default QrCode;