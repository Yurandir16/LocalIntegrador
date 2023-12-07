import {MenuRepository} from "../../domain/repositories/menuRepository";
import {validate} from "class-validator";
import { ValidatorCreateMenu } from "../../domain/validations/menuValidate";
import { Menu } from "../../domain/entities/menu";
export class CreateMenuCase {
    constructor(readonly MenuRepo: MenuRepository){}
    
    async run(pdf:string,restaurant_id:number):Promise<string|Menu|null|Error>{
        
        let data = new ValidatorCreateMenu(pdf,restaurant_id);
        const validation = await validate(data)
        console.log(validation)
        if (validation.length > 0){
            throw new Error(JSON.stringify(validation))
        }

        try {
            const createMenu = await this.MenuRepo.createMenu(
                pdf,
                restaurant_id
            );
            return createMenu;
        } catch (error) {
            return null;
        }
    }
}    