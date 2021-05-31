import React, { FC } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import FileUploader from "~/components/FileUploader";
import ImageUploader from "~/components/ImageUploader";

const Index: FC = () => {
    const prevent = (e) =>{
        e.preventDefault();
        e.stopPropagation();
    }
    return (
        <>
            <FileUploader accept="image/png, image/jpeg" multiple={true}>
                {
                    (files, setFiles, handleUpload, openDialog) => {
                        return (
                            <ImageUploader label="" files={files} setFiles={setFiles} handleUpload={handleUpload} openDialog={openDialog} />
                        )
                    }
                }
            </FileUploader>
        </>
    );
};

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ["header", "footer", "navigation", "events", "menu", "content"]),
    },
});

export default Index;
