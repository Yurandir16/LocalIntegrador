import { validate } from "class-validator";
import {codeRepository} from "../../domain/repositories/codeResporitory"
import { ValidateCodeByEmail } from "../../domain/validation/codeValidation";

export class GetCodeByEmail {
    constructor(readonly codeRepository: codeRepository){}

    async run(email_id:string){
        let data = new ValidateCodeByEmail(email_id);

        const validation = await validate(data)
        if (validation.length > 0){
            throw new Error(JSON.stringify(validation))
        }

        try {
            const codeRes = await this.codeRepository.getCodeByEmail(
                email_id
            );
            return codeRes
        }catch (error) {
            return null
        }
    }
}