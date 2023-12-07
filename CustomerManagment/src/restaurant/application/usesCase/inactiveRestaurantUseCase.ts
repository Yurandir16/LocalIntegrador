import {validate} from "class-validator";
import { ValidationInactive } from "../../domain/validations/restaurantValidate";
import { RestaurantRepository } from "../../domain/repositories/restaurantRepository";

export class inactiveRestaurantCase {
    constructor(readonly RestaurantRepo: RestaurantRepository){}
    
    async run(id:number,status:boolean){
        
        let data = new ValidationInactive(id,status);
        const validation = await validate(data)
        console.log(validation)
        if (validation.length > 0){
            throw new Error(JSON.stringify(validation))
        }

        try {
            const inactiveRes = await this.RestaurantRepo.inactiveRestaurant(
                id,
                status
            );
            return inactiveRes;
        } catch (error) {
            return null;
        }
    }
}    