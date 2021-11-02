import {postPageModel} from "../../../models/post-page.model";
import {EPostType} from "../../../helpers/enums";
import {IPost} from "../../../helpers/interfaces";
import {dataNormalization} from "../../../helpers/utils";

export default function handler(req, res) {
    const {
        query: {id},
        method,
    } = req

    switch (method) {
        case 'GET':
            postPageModel.findOne(EPostType.post, id, (err, post: IPost) => {
                if (err) {
                    res.status(200).json({code: 400, message: err});
                    return;
                } else {
                    res.status(200).json({code: 1, message: `Success`, post: post});
                    return;
                }
            });
            break;
        case 'PUT':
            const bodyRequest = req.body;
            const post = dataNormalization.normalizedPost(bodyRequest);
            post.id = id;
            postPageModel.update(EPostType.post, post, (err)=>{
                if (err){
                    res.status(200).json({code: 400, message: err});
                    return;
                }else{
                    res.status(200).json({code: 1, message: `Success`});
                    return;
                }
            });
            break;
        case 'DELETE':
            postPageModel.delete(EPostType.post, id, (err) => {
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
