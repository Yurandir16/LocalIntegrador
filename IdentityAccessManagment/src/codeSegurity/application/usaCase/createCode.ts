import { codeRepository } from "../../domain/repositories/codeResporitory";
import {validate} from "class-validator";
import { ValidatorCreateCode } from "../../domain/validation/codeValidation";
import { Code } from "../../domain/entities/code";
export class CreateCodeCase {
    constructor(readonly CodeRepo: codeRepository){}
    
    async run(code1:string,code2:string,code3:string, email_id:string):Promise<string|Code|null|Error>{
        
        let data = new ValidatorCreateCode(code1, code2,code3, email_id);
        const validation = await validate(data)
        console.log(validation)
        if (validation.length > 0){
            throw new Error(JSON.stringify(validation))
        }

        try {
            const createCode = await this.CodeRepo.addCode(
                code1,
                code2,
                code3,
                email_id
            );
            return createCode;
        } catch (error) {
            return null;
        }
    }
}    