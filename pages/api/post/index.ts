import {dataNormalization} from "../../../helpers/utils";
import {postPageModel} from "../../../models/post-page.model";
import {EPostType} from "../../../helpers/enums";
import {v4 as uuidv4} from 'uuid';


export default function handler(req, res) {
    const {
        method,
    } = req

    switch (method) {
        case 'POST':
            const bodyRequest = req.body;
            const post = dataNormalization.normalizedPost(bodyRequest);
            post.id = uuidv4();
            postPageModel.create(EPostType.post, post, (err)=>{
                if (err){
                    res.status(200).json({code: 400, message: err});
                    return;
                }else{
                    res.status(200).json({code: 1, message: `Success`});
                    return;
                }
            });
            break
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
