import fs from 'fs'
import path from 'path'
import {NextApiRequest, NextApiResponse} from "next";
import mime from 'mime';

export default (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { type, slug },
    } = req

    let dirRelativeToPublicFolder = '';
    switch (type) {
        case 'images':
            dirRelativeToPublicFolder = process.env.UPLOAD_DIR;
            break;
        default:
            dirRelativeToPublicFolder = '';
    }

    const filePath = path.join('./public', dirRelativeToPublicFolder, slug.toString());
    if (!fs.existsSync(filePath)) {
        res.status(404).json({message: 'File not found.'});
        return
    }
    res.writeHead(200, {
        'Content-Disposition': "inline",
        'Content-Type': mime.getType(slug)
    });

    var readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
}