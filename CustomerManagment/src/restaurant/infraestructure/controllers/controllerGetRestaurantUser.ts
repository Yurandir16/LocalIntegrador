import { Request, Response } from "express";
import { getUserRestaurantCase } from "../../application/usesCase/getRestaurantUserUseCase";
import axios from 'axios';

export class RestaurantControllerGetUser {
    constructor(
        readonly getRestaurantUserUseCase: getUserRestaurantCase
    ) { }

    async getRestaurantUser(req: Request, res: Response) {
        console.log("controller")
        try {
            let user_id = String(req.params.user_id);

            const uuid = req.params.user_id;

            if (!uuid) {
                throw new Error('User ID (uuid) is missing in the request parameters.');
            }

            const url = `http://localhost:3000/api/v1/User//${uuid}`;
            const response = await axios.get(url);

            console.log("Request successful. Data:", response.data);
    
            let userRes = await this.getRestaurantUserUseCase.run(user_id)

        
            if ( userRes instanceof Error) {
               return res.status(409).send({
                    status: "Error",
                    data: userRes.message
                });
            } 
            if (Array.isArray(userRes) && userRes.length>0){
                return res.status(201).send({
                    status:"success",
                    Restaurant: userRes,
                    UserData: response.data
                });
            }else{
                return res.status(200).send({
                    status: "success",
                    message: "the user does not have restaurants.",
                    UserData: response.data
                });
            }
        } catch (error) {
            return res.status(500).send({
                error: 500, 
                status:"error",
                message:"An unexpected error occurred restaurant for user"
            })
        }
    }
}