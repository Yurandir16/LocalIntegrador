import { Request, Response } from "express";
import { getMenuCase } from "../../application/usesCase/getMenuUseCase";
import { Menu } from "../../domain/entities/menu";

export class MenuControllerGet {
    constructor(
        readonly getMenuUseCase: getMenuCase
    ) { }

    async getMenu(req: Request, res: Response) {
        try {
            let restaurant_id = Number(req.params.restaurant_id)
            const menu = await this.getMenuUseCase.run(restaurant_id);
            if ( menu instanceof Error) {
                return res.status(409).send({
                     status: "Error",
                     data: menu.message
                 });
             } 
             if (Array.isArray(menu) && menu.length>0){
                 return res.status(201).send({
                     status:"success",
                     data:menu
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