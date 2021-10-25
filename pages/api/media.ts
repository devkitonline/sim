import {apiHandler} from "../../helpers/api/api-handle";
import {v4 as uuidv4} from 'uuid';
import formidable from "formidable";
import fs from "fs";
import {mediaModel} from "../../models/media.model";
import {IMedia} from "../../helpers/interfaces";

export default apiHandler(handler);

export const config = {
    api: {
        bodyParser: false
    }
}

async function handler(req, res) {
    const {
        method,
        query: {owner, make_public, name, desscription}
    } = req

    switch (method) {
        case 'GET':
            if (!owner){ //Get all public images
                await mediaModel.findAllPublic((err, media: IMedia[]) => {
                    if (err){
                        res.status(200).json({code: 400, message: err});
                        return;
                    }else{
                        res.status(200).json({code: 1, message: `Success`,type: "public", files: media});
                        return;
                    }
                });
            }else{ //Get all images by its owner
                await mediaModel.findAllByOwner(owner, (err, media: IMedia[]) => {
                    if (err){
                        res.status(200).json({code: 400, message: err});
                        return;
                    }else{
                        res.status(200).json({code: 1, message: `Success`, type: "private", owner: owner , files: media});
                        return;
                    }
                });
            }
            break
        case 'POST':
            const form = new formidable.IncomingForm();
            form.parse(req, async function (err, fields, files) {
                const file = files.file;
                const id = uuidv4();
                const extension = file.name.split('.').pop();
                file.name = id + '.' + extension;
                const image: IMedia = {
                    id: id,
                    isPublic: make_public == "true",
                    path: `/upload/${file.name}`,
                    ownerId: req.user.id,
                    name: name,
                    description: desscription,
                    type: file.type
                }
                await mediaModel.create(image, async (err) => {
                    if (err) {
                        res.status(200).json({code: 400, message: err});
                        return;
                    } else {
                        await saveFile(file);
                    }
                });

                return res.status(200).json({code: 1, message: `Success`, path: image.path});
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

