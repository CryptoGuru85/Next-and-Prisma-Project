import {NextApiRequest} from "next";
import {IncomingForm, File, Files} from "formidable";
import moment from "moment";
import {nanoid} from "nanoid";

const fs = require('fs');
const rename = fs.promises.rename;
const mkdir = fs.promises.mkdir;

const rootDir = require('path').resolve('./');

interface mFile extends File {
    save(): Promise<string>
}

export interface mFiles {
    [key: string]: mFile | mFile[];
}

const save = (file: File) => async (): Promise<string> => {
    const date = moment().format("DDMMYYYY");
    const dirUpload = `/public${process.env.UPLOAD_DIR}${date}`;
    const fileName = `${nanoid()}.${file.name?.split('.')[1]}`;

    await mkdir(`${rootDir}${dirUpload}`, {recursive: true});

    await rename(file.path, `${rootDir}${dirUpload}/${fileName}`);

    return `${dirUpload}/${fileName}`;
}

const format = (file: File | File[]): mFile | mFile[] => {
    const convert = (_file: File): mFile => {
        const mFile: mFile = _file as mFile;
        mFile.save = save(mFile);
        return mFile;
    }

    if (Array.isArray(file)) {
        return file.map(convert);
    }

    return convert(file);
}

const upload = (req: NextApiRequest): Promise<object[]> => {
    return new Promise((resolve, reject) => {
        const form = new IncomingForm({multiples: true});

        form.parse(req, (err: any, fields: object, files: Files) => {
            if (err) return reject(err)

            const resFiles: mFiles = {} as mFiles;

            for (let file in files) {
                resFiles[file] = format(files[file]);
            }

            resolve([fields, resFiles]);
        })
    });
}

export interface IUploadFile {
    [key: string]: string | string[]
}

const uploadFile = async (body: object, files: mFiles): Promise<IUploadFile> => {
    const data = {...body} as IUploadFile;

    for (const _key in files) {
        let _data: string | string[];

        const _files: mFile | mFile[] = files[_key];
        const key = _key.replace("[]", "");

        if (Array.isArray(_files)) {
            _data = await Promise.all<string>(
                _files.map(
                    (file: mFile): Promise<string> => file.save()
                )
            );
        } else {
            _data = await _files.save();
            if (_key.includes("[]")) {
                _data = [_data];
            }
        }

        data[key] = _data;
    }
    return data;
}

export default upload;

export {
    uploadFile
};
