import {RestaurantRepository } from "../../domain/repositories/restaurantRepository";
import {validate} from "class-validator";
import { ValidationLocationGet } from "../../domain/validations/restaurantValidate";

export class getLocationRestaurantCase {
    constructor(readonly RestaurantRepo: RestaurantRepository){}
    
    async run(address:string){
        
        let data = new ValidationLocationGet(address);
        const validation = await validate(data)
        if (validation.length > 0){
            throw new Error(JSON.stringify(validation))
        }

        try {
            const locationRes = await this.RestaurantRepo.getLocation(
                address
            );
            return locationRes;
        } catch (error) {
            return null;
        }
    }
}    