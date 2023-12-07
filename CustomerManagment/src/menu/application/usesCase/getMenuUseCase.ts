import {MenuRepository } from "../../domain/repositories/menuRepository";  
import {validate} from "class-validator";
import { ValidationGetMenu } from "../../domain/validations/menuValidate";
import { Menu } from "../../domain/entities/menu";

export class getMenuCase {
    constructor(readonly MenuRepo: MenuRepository){}
    
    async run(restaurant_id:number):Promise<string|Menu|null|Error>{
        
        let data = new ValidationGetMenu(restaurant_id);
        const validation = await validate(data)
        console.log(validation)
        if (validation.length > 0){
            throw new Error(JSON.stringify(validation))
        }

        try {
            const getMenu = await this.MenuRepo.getMenu(
                restaurant_id
            );
            return getMenu;
        } catch (error) {
            return null;
        }
    }
}    