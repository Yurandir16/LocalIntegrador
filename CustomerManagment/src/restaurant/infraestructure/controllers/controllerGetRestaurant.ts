import { Request, Response } from "express";
import { getRestaurantCase } from "../../application/usesCase/getRestaurantUseCase";

export class RestaurantControllerGet {
    constructor(
        readonly getRestaurantUseCase: getRestaurantCase
    ) { }

    async getRestaurant(req: Request, res: Response) {
        try {
            const restaurant = await this.getRestaurantUseCase.getRestaurant();
            if (restaurant && restaurant.length > 0) {
                return res.status(200).send({
                    status: "success",
                    data: restaurant,
                    message: 'List restaurant correct'
                });
            }
            return res.status(404).json({
                status: 'error',
                message: 'No se encontraron restaurants',
            });
        } catch (error) {
            if (error instanceof Error) {
    
                if (error.message.startsWith('[')) {
                  
                  return res.status(400).send({
                    status: "error",
                    message: "Validation failed",
                    errors: JSON.parse(error.message)
                  });
                }
              }
              return res.status(500).send({
                status: "error",
                message: "An error occurred."
              });
        }
    }
}
