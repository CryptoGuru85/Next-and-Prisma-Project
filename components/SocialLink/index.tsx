import React, { FC } from "react";
import {Formik, Field, Form, FormikValues} from "formik";
import styles from "./Social.module.css";
import Modal from 'react-modal';
import Button, { ButtonType } from "~/components/Button";
import SocialItem from "./SocialItem"
import { useTranslation } from "next-i18next";

interface SocialLinkProps {
  name: string;
  label: string;
  onChange: (value) => void;
}

export type SocialItemValues = {
  Instagram: string;
  Facebook: string;
  Twitter: string;
  Linkedin: string;
  Pinterest: string;
  Vkontakte: string;
}

const initialValues: SocialItemValues = {
  Instagram: "",
  Facebook: "",
  Twitter: "",
  Linkedin: "",
  Pinterest: "",
  Vkontakte: ""
};

const SocialLink: FC<SocialLinkProps> = (props:SocialLinkProps) => {

  const { t: tEvents } = useTranslation("events");
    
  const {name, label, onChange} = props

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [linkValue, setLinkValue] = React.useState<string>("");

  let formSubmit;
  let setValues;

  const onSubmit = (values: FormikValues) => {
    closeModal();
    let socialValue = '';
    if (values.Instagram) socialValue += socialValue ? ', ' + values.Instagram : values.Instagram;
    if (values.Facebook) socialValue += socialValue ? ', ' + values.Facebook : values.Facebook;
    if (values.Twitter) socialValue += socialValue ? ', ' + values.Twitter : values.Twitter;
    if (values.Linkedin) socialValue += socialValue ? ', ' + values.Linkedin : values.Linkedin;
    if (values.Pinterest) socialValue += socialValue ? ', ' + values.Pinterest : values.Pinterest;
    if (values.Vkontakte) socialValue += socialValue ? ', ' + values.Vkontakte : values.Vkontakte;
    setLinkValue(socialValue);
    onChange(values.Instagram + ', ' + values.Facebook + ', ' + values.Twitter + ', ' + values.Linkedin + ', ' + values.Pinterest + ', ' + values.Vkontakte);
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  const customStyles = {
    content : {
      transform: 'translate(-50%, -50%)',
    }
  };

  return (
    <div className={styles.inputContainer}>
      <span className={styles.label}>{label}</span>
        <Field
            onClick={openModal}
            name={name}
            className={styles.mainInput}
            value={linkValue}
        />
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          className={styles.modal}
        >
        <div className={styles.eventContainer}>
            <h3>{tEvents("EVENT_SOCIAL_LINK_TITLE")}</h3>
            <div className={styles.eventMain}>
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {formik => {
                        formSubmit = formik.submitForm;
                        setValues = formik.setValues;
                        return (
                          <Form>
                            <SocialItem name="Instagram" label="Instagram"/>
                            <SocialItem name="Facebook" label="Facebook"/>
                            <SocialItem name="Twitter" label="Twitter"/>
                            <SocialItem name="Linkedin" label="Linked in"/>
                            <SocialItem name="Pinterest" label="Pinterest"/>
                            <SocialItem name="Vkontakte" label="Vkontakte"/>
                          </Form>
                        )
                        }
                    }
                </Formik>
            </div>
            <div className={styles.actions}>
                <div className={styles.actionContainer}>
                    <Button onClick={() => {
                        formSubmit();
                    }} type={ButtonType.Button} danger={false}>{tEvents("EVENT_ACTION_SAVE")}</Button>
                </div>
            </div>
        </div>
        </Modal>
    </div>

  );
};

  export default SocialLink;