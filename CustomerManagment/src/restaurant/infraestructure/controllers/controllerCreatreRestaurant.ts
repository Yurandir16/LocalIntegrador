import { Request, Response } from "express";
import { CreateRestaurantCase } from "../../application/usesCase/createRestaurantUseCase";
import { Restaurant } from "../../domain/entities/restaurant";
export class RestaurantControllerCreate {
    constructor(
        readonly createRestaurantUseCase: CreateRestaurantCase
    ) { }

    async createRestaurant(req: Request, res: Response) {
    
       
        console.log("controller")
        try {
            let name_local = req.body.name_local;
            let description = req.body.description;
            let gender = req.body.gender;
            let image = req.file?.originalname ||'';
            let address = req.body.address;
            let coordinate = req.body.coordinate;
            let status = Boolean(req.body.status);
            let user_id = req.body.user_id;
            let createRes = await this.createRestaurantUseCase.run(name_local,description,gender,image,address,coordinate,status,user_id)
            console.log(createRes)
            if ( createRes instanceof Error) {
               return res.status(409).send({
                    status: "Error",
                    message: createRes.message
                });
            } 
            if (createRes instanceof Restaurant){
                return res.status(201).send({
                    status:"success",
                    data:{
                        name_local:createRes.name_local,
                        description: createRes.description,
                        gender: createRes.gender,
                        image: createRes.image,
                        address: createRes.address,
                        coordinate: createRes.coordinate,
                        status: createRes.status,
                        user_id: createRes.user_id,
                    }
                })
            }else{
                return res.status(500).send({
                    status:"error",
                    message:"An unexpected error occurred while create the restaurant"
                })
            }
        } catch (error) {
            return null;
        }
    }
}