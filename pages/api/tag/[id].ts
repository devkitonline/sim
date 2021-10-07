import {apiHandler} from "../../../helpers/api/api-handle";
import {tagModel} from "../../../models/tag.model";
import {ITag} from "@/lib/utils/interfaces";

export default apiHandler(handler);

async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req

    switch (method) {
        case 'PUT':
            const bodyRequest = req.body;

            if (Object.getOwnPropertyNames(bodyRequest).length < 1){
                res.status(200).json({code: 103, message: `Expression parameter must at least 1.`});
                return;
            }

            await tagModel.findOne(id, (err, tag: ITag)=>{
                if (err){
                    res.status(200).json({code: 104, message: `Tag is not exists.`});
                    return;
                }else{
                    const updateTag: ITag = {
                        id: tag.id,
                        name: bodyRequest.hasOwnProperty('name') ? bodyRequest.name : tag.name,
                        slug: bodyRequest.hasOwnProperty('slug') ? bodyRequest.slug : tag.slug,
                        description: bodyRequest.hasOwnProperty('description') ? bodyRequest.description : tag.description
                    }

                    tagModel.update(updateTag, (err) => {
                        if (err){
                            if (err.search("ER_DUP_ENTRY") > -1 && err.search("slug") > -1) {
                                res.status(200).json({code: 102, message: `The slug is already exists.`});
                                return;
                            }
                            res.status(200).json({code: 400, message: err});
                            return;
                        }else{
                            res.status(200).json({code: 1, message: `Update successfully.`});
                            return;
                        }
                    });
                }
            });

            break
        case 'DELETE':
            await tagModel.findOne(id, (err, tag: ITag)=>{
                if (err){
                    res.status(200).json({code: 104, message: `Tag is not exists.`});
                    return;
                }else{
                    tagModel.delete(tag.id, (err) => {
                        if (err){
                            res.status(200).json({code: 400, message: err});
                            return;
                        }else{
                            res.status(200).json({code: 1, message: `Delete successfully.`});
                            return;
                        }
                    });
                }
            });

            break;
        default:
            res.setHeader('Allow', ['PUT', 'DELETE'])
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
