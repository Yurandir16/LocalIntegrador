import {RestaurantRepository } from "../../domain/repositories/restaurantRepository";
import {validate} from "class-validator";
import { ValidatorCreateRestaurant } from "../../domain/validations/restaurantValidate";
import { Restaurant } from "../../domain/entities/restaurant";

export class CreateRestaurantCase {
    constructor(readonly RestaurantRepo: RestaurantRepository){}
    
    async run(name_local:string,description:string,gender:string,image:string,address:string,coordinate:string,status:boolean,user_id:string):Promise<string|Restaurant|null|Error>{
        
        let data = new ValidatorCreateRestaurant(name_local,description,gender,image,address,coordinate,status,user_id);
        const validation = await validate(data)
        console.log(validation)
        if (validation.length > 0){
            throw new Error(JSON.stringify(validation))
        }

        try {
            const createRes = await this.RestaurantRepo.createRestaurant(

                name_local,
                description,
                gender,
                image,
                address,
                coordinate,
                status,
                user_id
            );
            return createRes;
        } catch (error) {
            return null;
        }
    }
}    