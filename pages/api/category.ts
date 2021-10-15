import {apiHandler} from "../../helpers/api/api-handle";
import {categoryModel} from "../../models/category.model";
import {ICategory} from "helpers/interfaces";
import {v4 as uuidv4} from 'uuid';
import {slugHelper} from "../../helpers/slug";

export default apiHandler(handler);

async function handler(req, res) {
    const {
        method
    } = req

    switch (method) {
        case 'GET':
            await categoryModel.findAll((err, categories: ICategory[]) => {
                if (err){
                    res.status(200).json({code: 400, message: err});
                    return;
                }else{
                    res.status(200).json({code: 1, message: `Success`, categories: categories});
                    return;
                }
            });
            break
        case 'POST':
            const bodyRequest = req.body;
            if (!checkPostParams(bodyRequest)){
                res.status(200).json({code: 103, message: `Expression parameter "name" is required.`});
                return;
            }

            const newCategory: ICategory = {
                id: uuidv4(),
                name: bodyRequest.name,
                slug: bodyRequest.hasOwnProperty('slug') ? bodyRequest.slug : slugHelper.generateSlug(bodyRequest.name),
                description: bodyRequest.hasOwnProperty('description') ? bodyRequest.description : "",
                image: bodyRequest.hasOwnProperty('image') ? bodyRequest.image : "",
                categoryParent: bodyRequest.hasOwnProperty('categoryParent') ? bodyRequest.categoryParent : ""
            }

            await categoryModel.create(newCategory, (err) => {
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

