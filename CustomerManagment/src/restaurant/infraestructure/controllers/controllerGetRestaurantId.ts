import { Request, Response } from "express";
import { getRestaurantIdCase } from "../../application/usesCase/getRestaurantIdUseCase";
import { Restaurant } from "../../domain/entities/restaurant";
import axios from 'axios';
export class RestaurantControllerGetId {
    constructor(
        readonly getRestaurantIdUseCase: getRestaurantIdCase
    ) { }

    async getRestaurantId(req: Request, res: Response) {
        
        console.log("controllerRestaurant")
        try {
            let id = Number(req.params.id);
        
            let idUser = await this.getRestaurantIdUseCase.run(id)
            console.log(idUser)
            if ( idUser instanceof Error) {
               return res.status(500).send({
                    status: "Error",
                    data: idUser.message,
                    //dataReview: response.data
                });
            } 
            if (Array.isArray(idUser) && idUser.length>0){
                return res.status(404).send({
                    status:"Error",
                    data: "An unexpected error ocurred restaurant"
                })
            }else{
                return res.status(201).send({
                    status:"Success",
                    message:idUser
                })
            }
        } catch (error) {
            return res.status(500).send({
                status: "Error",
                message: "An unexpected error occurred"
              });
        }
    }
}
