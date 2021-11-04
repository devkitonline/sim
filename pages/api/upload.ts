import {apiHandler} from "../../helpers/api/api-handle";
import {v4 as uuidv4} from 'uuid';
import formidable from "formidable";
import fs from "fs";

export default apiHandler(handler);

export const config = {
    api: {
        bodyParser: false
    }
}

async function handler(req, res) {
    const {
        method
    } = req

    switch (method) {
        case 'POST':
            const form = new formidable.IncomingForm();
            form.parse(req, async function (err, fields, files) {
                const file = files.file;
                const id = uuidv4();
                const extension = file.name.split('.').pop();
                if(['png','PNG','jpg','JPG','JPEG','jpeg'].includes(extension)) {
                    file.name = id + '.' + extension;
                    await saveFile(file);
                    return res.status(200).json({code: 1, message: `Success`, location: `/upload/${file.name}`});
                }else{
                    return res.status(200).json({code: 1, message: `Success`, location: `/upload/${file.name}`});
                }
            });
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

const saveFile = async (file) => {
    const data = fs.readFileSync(file.path);
    fs.writeFileSync(`./public/upload/${file.name}`, data);
    await fs.unlinkSync(file.path);
    return;
};

