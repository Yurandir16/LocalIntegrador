import {RestaurantRepository } from "../../domain/repositories/restaurantRepository";
import {validate} from "class-validator";
import { ValidationIdGet } from "../../domain/validations/restaurantValidate";

export class getRestaurantIdCase {
    constructor(readonly RestaurantRepo: RestaurantRepository){}
    
    async run(id:number){
        
        let data = new ValidationIdGet(id);
        const validation = await validate(data)
        console.log(validation)
        if (validation.length > 0){
            throw new Error(JSON.stringify(validation))
        }

        try {
            const idRes = await this.RestaurantRepo.getRestaurantId(
                id
            );
            return idRes;
        } catch (error) {
            return null;
        }
    }
}    