import {menuModel} from "../../models/menu.model";
import {IMenu} from "../../helpers/interfaces";
import {dataNormalization} from "../../helpers/utils";

export default async function handler(req, res) {
    const {
        method,
    } = req

    switch (method) {
        case 'GET':
            await menuModel.findAll((err, menus: IMenu[]) => {
                if (err){
                    res.status(200).json({code: 400, message: err});
                    return;
                }else{
                    res.status(200).json({code: 1, message: `Success`, menus: menus});
                    return;
                }
            });

            break;
        case 'POST':
            const bodyRequest = req.body;
            if (!checkPostParams(bodyRequest)){
                res.status(200).json({code: 103, message: `Expression parameter "menus" is required.`});
                return;
            }

            let menus: IMenu[] = [];
            for (let ele of bodyRequest.menus){
                const menu = dataNormalization.normalizedMenu(ele);
                menus.push(menu);
            }
            await menuModel.create(menus, (err) => {
                if (err){
                    res.status(200).json({code: 400, message: err});
                    return;
                }else{
                    res.status(200).json({code: 1, message: `Success`});
                    return;
                }
            });
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

const checkPostParams = (body) =>{
    return !(!body.menus);
}
