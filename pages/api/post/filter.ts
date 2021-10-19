import {dataNormalization} from "../../../helpers/utils";
import {postPageModel} from "../../../models/post-page.model";
import {EPostType} from "../../../helpers/enums";
import { IPost} from "../../../helpers/interfaces";

export default async function handler(req, res) {
    const {
        method,
    } = req

    switch (method) {
        case 'POST':
            const bodyRequest = req.body;

            if (!checkParams(bodyRequest)) {
                res.status(200).json({code: 103, message: `Expression parameter not all.`});
                return;
            }

            const filterCondition = dataNormalization.normalizedFilterCondition(bodyRequest);
            await postPageModel.findByFilters(EPostType.post, filterCondition, (err, posts: IPost[])=>{
                if (err){
                    res.status(200).json({code: 400, message: err});
                    return;
                }else{
                    res.status(200).json({code: 1, message: `Success`, pages: posts});
                    return;
                }
            });
            break
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

const checkParams = (body) => {
    return !(!body.conditions);
}
