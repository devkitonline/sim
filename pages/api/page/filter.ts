import {dataNormalization} from "../../../helpers/utils";
import {postPageModel} from "../../../models/post-page.model";
import {EPostType} from "../../../helpers/enums";
import {IPage} from "../../../helpers/interfaces";
import {encrypt} from "../../../helpers/encryption";

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
            await postPageModel.findByFilters(EPostType.page, filterCondition, (err, pages: IPage[], totalResult: number)=>{
                if (err){
                    res.status(200).json({code: 400, message: err});
                    return;
                }else{
                    res.status(200).json({code: 1, message: `Success`, data: pages, total_records: totalResult});
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
    encrypt();
    return !(!body.conditions);
}
