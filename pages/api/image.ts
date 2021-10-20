import {apiHandler} from "../../helpers/api/api-handle";
import {v4 as uuidv4} from 'uuid';
import formidable from "formidable";
import fs from "fs";
import {imageModel} from "../../models/image.model";
import {IImage} from "../../helpers/interfaces";
import imageTypes from '../../constants/imageTypes.json';

export default apiHandler(handler);

export const config = {
    api: {
        bodyParser: false
    }
}

async function handler(req, res) {
    const {
        method,
        query: {owner, path, id, make_public}
    } = req

    switch (method) {
        case 'GET':

            break
        case 'POST':
            const form = new formidable.IncomingForm();
            form.parse(req, async function (err, fields, files) {
                const file = files.file;
                const id = uuidv4();
                // upload new file's name by id
                file.name = id + getImageExtension(file.type, imageTypes);
                const image: IImage = {
                    id: id,
                    isPublic: make_public == "true",
                    path: `./public/upload/${file.name}`,
                    ownerId: req.user.id
                }
                await imageModel.create(image, async (err) => {
                    if (err) {
                        res.status(200).json({code: 400, message: err});
                        return;
                    } else {
                        await saveFile(file);
                    }
                });

                return res.status(200).json({code: 1, message: `Success`});
            });
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

const saveFile = async (file) => {
    const data = fs.readFileSync(file.path);
    fs.writeFileSync(`./public/upload/${file.name}`, data);
    await fs.unlinkSync(file.path);
    return;
};

const getImageExtension = (type: string, listTypes: any[]) =>{
    const t = listTypes.find(t => t.type == type);
    return t.extension;
}
