
export interface UploaderProps {
    label: string;
    files: File[];
    setFiles: (files: File[]) => void;
    handleUpload: (e: any) => void;
    openDialog: () => void;
}

export type PreviewFile = {
    name: string;
    src: string;
    type?: string;
}