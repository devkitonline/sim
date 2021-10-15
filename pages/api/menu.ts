import {menuModel} from "../../models/menu.model";
import {IMenu} from "../../helpers/interfaces";
import {dataNormalization} from "../../helpers/utils";

export async function handler(req, res) {
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
            const bodyRequest = JSON.parse(req.body);
            let menus: IMenu[] = [];
            for (let ele of bodyRequest){
                const menu = dataNormalization.normalizedMenu(bodyRequest);
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
