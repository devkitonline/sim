import {postPageModel} from "../../../models/post-page.model";
import {EPostType} from "../../../helpers/enums";
import {IPage} from "../../../helpers/interfaces";

export default function handler(req, res) {
    const {
        query: { id },
        method,
    } = req

    switch (method) {
        case 'GET':
            postPageModel.findOne(EPostType.page, id, (err, page : IPage)=>{
                if (err){
                    res.status(200).json({code: 400, message: err});
                    return;
                }else{
                    res.status(200).json({code: 1, message: `Success`, page: page});
                    return;
                }
            });
            break;
        case 'PUT':
            res.status(200).json({ id, name: `PUT page` });
            break;
        case 'DELETE':
            postPageModel.delete(EPostType.page, id, (err) => {
                if (err) {
                    res.status(200).json({code: 400, message: err});
                    return;
                } else {
                    res.status(200).json({code: 1, message: `Success`});
                    return;
                }
            })
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
