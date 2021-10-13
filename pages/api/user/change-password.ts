import {userModel} from "../../../models/user.model";
import {IUser} from "helpers/interfaces";
import {apiHandler} from "../../../helpers/api/api-handle";
const md5 = require('md5');

export default apiHandler(handler);

async function handler(req, res) {
    const {
        method,
    } = req

    switch (method) {
        case 'PUT':
            const bodyRequest = req.body;

            if (!checkParams(bodyRequest)) {
                res.status(200).json({code: 103, message: `Expression parameter not all.`});
                return;
            }

            await userModel.findOneById(bodyRequest.id, (err, user: IUser) =>{
                if (err){
                    res.status(200).json({code: 106, message: `The user is not exists.`});
                    return;
                }else{
                    if (validatePassword(user, bodyRequest.password)){
                        userModel.updatePwd(user.id, md5(bodyRequest.new_password), (err)=>{
                            if (err){
                                res.status(200).json({code: 400, message: err});
                                return;
                            }else{
                                res.status(200).json({code: 1, message: `Success.`});
                                return;
                            }
                        });
                    }else{
                        res.status(200).json({code: 107, message: `The password does not match.`});
                        return;
                    }
                }
            });

            break;
        default:
            res.setHeader('Allow', ['PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}

const checkParams = (body): boolean => {
    return !(!body.id || !body.password || !body.new_password);
}

const validatePassword = (user: IUser, password: string):boolean=>{
    return md5(password) === user.pwd;
}
