import {apiHandler} from "../../helpers/api/api-handle";
import {userModel} from "models/user.model";
import {IUser} from "helpers/interfaces";

export default apiHandler(handler);

async function handler(req, res) {
    const {
        method,
    } = req

    switch (method) {
        case 'GET':
            await userModel.findAll((err, users: IUser[]) =>{
                if (err){
                    res.status(200).json({code: 400, message: err});
                    return;
                }else{
                    res.status(200).json({code: 1, message: `Success`, users: users});
                    return;
                }
            });
            break;
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
