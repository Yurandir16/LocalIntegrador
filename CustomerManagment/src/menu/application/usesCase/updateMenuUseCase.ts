import {MenuRepository} from "../../domain/repositories/menuRepository";
import {validate} from "class-validator";
import { ValidatorUpdateMenu } from "../../domain/validations/menuValidate";
export class UpdateMenuCase {
    constructor(readonly MenuRepo: MenuRepository){}
    
    async run(id:number,pdf:string,restaurant_id:number){
        
        let data = new ValidatorUpdateMenu(pdf,restaurant_id);
        const validation = await validate(data)
        console.log(validation)
        if (validation.length > 0){
            throw new Error(JSON.stringify(validation))
        }

        try {
            const createMenu = await this.MenuRepo.UpdateMenu(
                id,
                pdf,
                restaurant_id
            );
            return createMenu;
        } catch (error) {
            return null;
        }
    }
}    