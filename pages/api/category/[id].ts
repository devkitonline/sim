import {apiHandler} from "../../../helpers/api/api-handle";
import {categoryModel} from "../../../models/category.model";
import {ICategory} from "@/lib/utils/interfaces";

export default apiHandler(handler);

async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req

    switch (method) {
        case 'PUT':
            const bodyRequest = JSON.parse(req.body);

            if (Object.getOwnPropertyNames(bodyRequest).length < 1){
                res.status(200).json({code: 103, message: `Expression parameter must at least 1.`});
                return;
            }

            await categoryModel.findOne(id, (err, category: ICategory)=>{
                if (err){
                    res.status(200).json({code: 104, message: `The category is not exists.`});
                    return;
                }else{
                    const updateCate: ICategory = {
                        id: category.id,
                        name: bodyRequest.hasOwnProperty('name') ? bodyRequest.name : category.name,
                        slug: bodyRequest.hasOwnProperty('slug') ? bodyRequest.slug : category.slug,
                        description: bodyRequest.hasOwnProperty('description') ? bodyRequest.description : category.description,
                        image: bodyRequest.hasOwnProperty('image') ? bodyRequest.image : category.image,
                        categoryParent: bodyRequest.hasOwnProperty('parent_id') ? bodyRequest.parent_id : category.categoryParent
                    }

                    categoryModel.update(updateCate, (err) => {
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

            break;
        case 'DELETE':
            await categoryModel.findOne(id, (err, category: ICategory)=>{
                if (err){
                    res.status(200).json({code: 104, message: `The category is not exists.`});
                    return;
                }else{
                    categoryModel.delete(category.id, (err) => {
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
            break
        default:
            res.setHeader('Allow', ['PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
