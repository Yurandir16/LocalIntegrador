import { Request, Response } from "express";
import { CreateMenuCase } from "../../application/usesCase/createMenuUseCase";
import { Menu } from "../../domain/entities/menu";
export class MenuControllerCreate {
    constructor(readonly createMenuUseCase: CreateMenuCase){}

    async createRestaurant(req: Request, res: Response) {
        console.log("controllerMenu")
        try {
            let pdf= req.file?.originalname || '';
            let restaurant_id = Number(req.params.restaurant_id);

            console.log(restaurant_id)
            if (isNaN(restaurant_id)) {
                return res.status(400).send({
                  status: "Error",
                  message: "restaurantId must be a number"
                });
              }

            let createMenu = await this.createMenuUseCase.run(pdf,restaurant_id)
            if ( createMenu instanceof Error) {
               return res.status(409).send({
                    status: "Error",
                    data: createMenu.message
                });
            } 
            if (createMenu instanceof Menu){
                return res.status(201).send({
                    status:"success",
                    data:{
                        pdf: createMenu.pdf,
                        restaurant_id: createMenu.retaurant_id
                    }
                })
            }else{
                return res.status(500).send({
                    status:"error",
                    message:"An unexpected error occurred while create the menu"
                })
            }
        } catch (error) {
            return null;
        }
    }
}