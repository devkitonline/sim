import {postPageModel} from "../../../../models/post-page.model";
import {EPostType} from "../../../../helpers/enums";

export default function handler(req, res) {
    const {
        method,
        query: {id},
    } = req

    switch (method) {
        case 'GET':
            postPageModel.increaseView(EPostType.page, id, (err)=>{
                if (err) {
                    res.status(200).json({code: 400, message: err});
                    return;
                } else {
                    res.status(200).json({code: 1, message: `Success`});
                    return;
                }
            });
            break
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

