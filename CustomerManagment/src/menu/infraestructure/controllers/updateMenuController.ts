import { Request, Response } from "express";
import { Menu } from "../../domain/entities/menu";
import { UpdateMenuCase } from "../../application/usesCase/updateMenuUseCase";
export class MenuControllerUpdate {
    constructor(
        readonly updateMenuUseCase: UpdateMenuCase
    ) { }

    async updateMenu(req: Request, res: Response) {
        try {
            let id = Number(req.params.id);
            let pdf = req.file?.originalname || '';
            let restaurant_id = Number(req.body.restaurant_id);
            
            let  menu = await this.updateMenuUseCase.run(id,pdf,restaurant_id)
            if (menu instanceof Error) {
                return res.status(409).send({
                    status: "success",
                    message: menu.message
                });
            }
            if (menu instanceof Menu){
                return res.status(200).send({
                    status: "success",
                    pdf : menu.pdf,
                    restaurant_id: menu.retaurant_id
                });
            }else{
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while update the menu."
                });
            }
        } catch (error) {
           return null;
        }
    }
}