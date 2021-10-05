import { apiHandler } from 'helpers/api/api-handle';
import {userModel} from "models/user.model";
import {IUser} from "@/lib/utils/interfaces";

export default apiHandler(userHandler);

async function userHandler(req, res) {
    const {
        query: { id },
        method,
    } = req
    
    switch (method) {
        case 'GET':
            userModel.findOneById(id, (err, user: IUser)=>{
                if (err){
                    res.status(200).json({code: 106, message: `The user is not exists.`});
                    return;
                }else{
                    res.status(200).json({code: 1, message: `Success`, user: user});
                    return;
                }
            })
            break;
        case 'PUT':
            const bodyRequest = req.body;

            if (!checkParams(bodyRequest)) {
                res.status(200).json({code: 103, message: `Expression parameter not all.`});
                return;
            }

            const updateUser: IUser = {
                id: id,
                username: null, //not update in there
                pwd: null,// not update in there
                email: bodyRequest.email,
                lastName: bodyRequest.last_name,
                firstName: bodyRequest.first_name,
                role: bodyRequest.role
            }

            await userModel.update(updateUser, (err, updateRow: number) => {
                if (err){
                    if (err.search("ER_DUP_ENTRY") > -1 && err.search("email") > -1) {
                        res.status(200).json({code: 102, message: `Email is already registered.`});
                        return;
                    }
                    res.status(200).json({code: 400, message: err});
                    return;
                }else{
                    res.status(200).json({code: 1, message: `Update successfully.`});
                    return;
                }
            });

            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}

const checkParams = (body): boolean =>{
    return !(!body.email || !body.last_name || !body.first_name || !body.role);
}
