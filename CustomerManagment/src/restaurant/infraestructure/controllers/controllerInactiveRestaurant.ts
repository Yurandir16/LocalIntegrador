import { Request, Response } from "express";
import { inactiveRestaurantCase } from "../../application/usesCase/inactiveRestaurantUseCase";
import { Restaurant } from "../../domain/entities/restaurant";

export class inactiveRestaurantController {
    constructor(
        readonly inactiveRestaurantUseCase: inactiveRestaurantCase
    ) { }

    async inactiveRestaurant(req: Request, res: Response) {
        console.log("controller")
        try {
            let id = Number(req.query.id);
            let status = Boolean(req.body.status);
            if (isNaN(id)) {
                return res.status(400).send({
                    status: "Error",
                    message: "id debe ser un número"
                });
            }

            let inactive = await this.inactiveRestaurantUseCase.run(id,status)
            if ( inactive instanceof Error) {
               return res.status(409).send({
                    status: "Error",
                    data: inactive.message
                });
            } 
            if (inactive instanceof Restaurant){
                return res.status(201).send({
                    status:"success",
                    data:{
                        name_local:inactive.name_local,
                        description: inactive.description,
                        gender: inactive.gender,
                        image: inactive.image,
                        address: inactive.address,
                        coordinate: inactive.coordinate,
                        status: inactive.status,
                        user_id: inactive.user_id,
                    }
                })
            }else{
                return res.status(500).send({
                    status:"error",
                    message:"An unexpected error occurred inactive"
                })
            }
        } catch (error) {
            return null;
        }
    }
}