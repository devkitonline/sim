import {apiHandler} from "../../helpers/api/api-handle";
import {tagModel} from "../../models/tag.model";
import {ITag} from "helpers/interfaces";
import {v4 as uuidv4} from 'uuid';
import {convertToSlug} from "../../helpers/utils";

export default apiHandler(handler);

async function handler(req, res) {
    const {
        method,
    } = req

    switch (method) {
        case 'GET':
            await tagModel.findAll((err, tags: ITag[]) => {
                if (err){
                    res.status(200).json({code: 400, message: err});
                    return;
                }else{
                    res.status(200).json({code: 1, message: `Success`, tags: tags});
                    return;
                }
            });
            break;
        case 'POST':
            const bodyRequest = req.body;
            if (!checkPostParams(bodyRequest)){
                res.status(200).json({code: 103, message: `Expression parameter "name" is required.`});
                return;
            }

            const newTag: ITag = {
                id: uuidv4(),
                name: bodyRequest.name,
                slug: bodyRequest.hasOwnProperty('slug') && bodyRequest.slug != "" ? bodyRequest.slug : convertToSlug(bodyRequest.name),
                description: bodyRequest.hasOwnProperty('description') ? bodyRequest.description : ""
            }

            await tagModel.create(newTag, (err) => {
                if (err){
                    if (err.search("ER_DUP_ENTRY") > -1 && err.search("slug") > -1) {
                        res.status(200).json({code: 102, message: `The slug is already exists.`});
                        return;
                    }
                    res.status(200).json({code: 400, message: err});
                    return;
                }else{
                    res.status(200).json({code: 1, message: `Create successfully.`});
                    return;
                }
            });

            break;
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}

const checkPostParams = (body) =>{
    return !(!body.name); //slug and description are optional params
}
