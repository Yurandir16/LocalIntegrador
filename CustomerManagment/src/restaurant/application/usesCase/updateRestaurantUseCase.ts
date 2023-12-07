import {RestaurantRepository } from "../../domain/repositories/restaurantRepository";
import {validate} from "class-validator";
import { ValidatorUpdateRestaurant } from "../../domain/validations/restaurantValidate";

export class UpdateRestaurantCase {
    constructor(readonly RestaurantRepo: RestaurantRepository){}
    
    async run(id:number,name_local:string,description:string,gender:string,image:string,address:string,coordinate:string,status:boolean,user_id:string){
        
        let data = new ValidatorUpdateRestaurant(name_local,description,gender,image,address,coordinate,status,user_id);
        const validation = await validate(data)
        console.log(validation)
        if (validation.length > 0){
            throw new Error(JSON.stringify(validation))
        }

        try {
            const updateRes = await this.RestaurantRepo.updateRestaurant(
                id,
                name_local,
                description,
                gender,
                image,
                address,
                coordinate,
                status,
                user_id
            );
            return updateRes;
        } catch (error) {
            return null;
        }
    }
}    