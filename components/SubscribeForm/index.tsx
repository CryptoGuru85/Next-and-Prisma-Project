import React, { FC, useState } from "react";
import { Formik, Field, Form, FormikValues } from "formik";

import styles from "./SubscribeForm.module.css";
import ActivityIndicator from "../ActitityIndicator";
import { useTranslation } from "next-i18next";

enum SubscribeStage {
    None,
    Loading,
    Success,
    Error,
}

/**
 * Форма оформления подписки
 */
const SubscribeForm: FC = () => {
    const { t } = useTranslation("footer");
    const [stage, setStage] = useState<SubscribeStage>(SubscribeStage.None);

    const initialValues = {
        email: "",
    };

    const onSubmit = (values: FormikValues) => {
        setStage(SubscribeStage.Loading);
        setTimeout(()=>{
            setStage(Math.random() > 1/6 ? SubscribeStage.Success : SubscribeStage.Error);
        }, Math.random() * 2000);
    };

    const resetForm = () => {
        setStage(SubscribeStage.None);
    };

    return (
        <div className={styles.subscribeFormContainer}>
            {
                stage === SubscribeStage.None ?
                    <>
                    <span>{t("SUBSCRIBE_TITLE")}</span>
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                        <Form className={styles.emailForm}>
                            <Field className={styles.emailInput} name="email" type="email" placeholder={t("SUBSCRIBE_PLACEHOLDER")}/>
                            <button className={styles.submitButton} type="submit">{t("SUBSCRIBE_SEND_BUTTON")}</button>
                        </Form>
                    </Formik>
                    </>
                : stage === SubscribeStage.Loading ?
                    <div className={styles.emailForm}>
                        <ActivityIndicator size={64} thickness={3} text={t("SUBSCRIBE_LOADING")} direction="row" />
                    </div>
                : stage === SubscribeStage.Success ?
                    <span>{t("SUBSCRIBE_SUCCESS")}</span>
                : stage === SubscribeStage.Error ?
                    <div className={styles.emailForm}>
                        <span>{t("SUBSCRIBE_ERROR")}</span>
                        <button className={styles.submitButton} onClick={resetForm}>{t("SUBSCRIBE_REPEAT_BUTTON")}</button>
                    </div>
                :
                    <></>
            }
        </div>
    );
};

export default SubscribeForm;