import {apiHandler} from "../../../helpers/api/api-handle";
import {categoryModel} from "../../../models/category.model";
import {ICategory} from "helpers/interfaces";

export default apiHandler(handler);

async function handler(req, res) {
    const {
        query: { pid },
        method,
    } = req

    switch (method) {
        case 'GET':
            await categoryModel.findChildren(pid, (err, categories: ICategory[]) => {
                if (err){
                    res.status(200).json({code: 400, message: err});
                    return;
                }else{
                    res.status(200).json({code: 1, message: `Success`, chilren: categories});
                    return;
                }
            });
            break;
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
