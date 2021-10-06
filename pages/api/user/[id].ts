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

            if (Object.getOwnPropertyNames(bodyRequest).length < 1){
                res.status(200).json({code: 103, message: `Expression parameter must at least 1.`});
                return;
            }

            await userModel.findOneById(id, (err, user: IUser) => {
                if (err){
                    res.status(200).json({code: 104, message: `User is not exists.`});
                    return;
                }else{
                    const updateUser: IUser = {
                        id: user.id,
                        username: null, //not update in there
                        pwd: null,// not update in there
                        email: bodyRequest.hasOwnProperty('email') ? bodyRequest.email : user.email,
                        lastName: bodyRequest.hasOwnProperty('last_name') ? bodyRequest.last_name : user.lastName,
                        firstName: bodyRequest.hasOwnProperty('first_name') ? bodyRequest.first_name : user.firstName,
                        roleId: bodyRequest.hasOwnProperty('role_id') ? bodyRequest.role_id : user.roleId
                    }

                    userModel.update(updateUser, (err, updateRow: number) => {
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
                }
            })

            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}

