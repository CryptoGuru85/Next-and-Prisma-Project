import React, { FC, useRef, useState } from "react";

interface FileUploaderProps {
    accept: string;
    multiple: boolean;
    children: ( files: File[],
                setFiles: (files: File[]) => void,
                handleUpload: (e: any) => void,
                openDialog: () => void
              ) => (JSX.Element | JSX.Element[])
}

/**
 * Красивый FileUploader
 * @param props
 */
const FileUploader: FC<FileUploaderProps> = (props: FileUploaderProps) => {
    const { accept, multiple, children } = props;

    const [files, setFiles] = useState<File[]>([]);
    const inputRef = useRef(null);

    const prevent = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleUpload = (e) => {
        prevent(e);
        const dt = e.dataTransfer || e.target;
        if ( dt ) {
            let files = Array.from(dt.files);
            if ( !multiple ) {
                files = files.filter( (f: File, i) => i === 0 && f.type !== "" && accept.search(f.type) !== -1 );
            }
            else {
                files = files.filter( (f: File) => f.type !== "" && accept.search(f.type) !== -1 )
            }
            setFiles(files as File[]);
        }
    };

    return (<>
        { children(files, setFiles, handleUpload, () => {
            inputRef.current?.click();
        }) }
        <input multiple={multiple} accept={accept} type="file" onInput={handleUpload} ref={inputRef} style={{ display: "none" }} />
    </>);
};

export default FileUploader;