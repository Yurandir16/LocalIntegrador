import {RestaurantRepository } from "../../domain/repositories/restaurantRepository";
import {validate} from "class-validator";
import { ValidationUserGet } from "../../domain/validations/restaurantValidate";

export class getUserRestaurantCase {
    constructor(readonly RestaurantRepo: RestaurantRepository){}
    
    async run(user_id:string){
        
        let data = new ValidationUserGet(user_id);
        
        const validation = await validate(data)
        console.log(validation)
        if (validation.length > 0){
            throw new Error(JSON.stringify(validation))
        }

        try {
            const userRes = await this.RestaurantRepo.getRestaurantUser(
                user_id
            );
            return userRes;
        } catch (error) {
            return null;
        }
    }
}    
