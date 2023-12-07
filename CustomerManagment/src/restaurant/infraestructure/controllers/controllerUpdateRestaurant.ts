import { Request, Response } from "express";
import { UpdateRestaurantCase } from "../../application/usesCase/updateRestaurantUseCase";
import { Restaurant } from "../../domain/entities/restaurant";

export class updateRestaurantController {
    constructor(
        readonly updateRestaurantUseCase: UpdateRestaurantCase
    ) { }

    async updateRestaurant(req: Request, res: Response) {
        console.log("controller")
        try {
            let id = Number(req.params.id);
            let name_local = req.body.name_local;
            let description = req.body.description;
            let gender = req.body.gender;
            let image = req.file?.originalname ||'';
            let address = req.body.address;
            let coordinate = req.body.coordinate;
            let status = Boolean(req.body.status);
            //let user_id = String(req.body.user_id);
            const user_id =String(req.body.user_id);


            let updateRes = await this.updateRestaurantUseCase.run(id,name_local,description,gender,image,address,coordinate,status,user_id)
            if ( updateRes instanceof Error) {
               return res.status(409).send({
                    status: "Error",
                    data: updateRes.message
                });
            } 
            if (updateRes instanceof Restaurant){
                return res.status(201).send({
                    status:"success",
                    data:{
                        name_local:updateRes.name_local,
                        description: updateRes.description,
                        gender: updateRes.gender,
                        image: updateRes.image,
                        address: updateRes.address,
                        coordinate: updateRes.coordinate,
                        status: updateRes.status,
                        user_id:updateRes.user_id
                    }
                })
            }else{
                return res.status(500).send({
                    status:"error",
                    message:"An unexpected error occurred while update the restaurant"
                })
            }
        } catch (error) {
            return null;
        }
    }
}