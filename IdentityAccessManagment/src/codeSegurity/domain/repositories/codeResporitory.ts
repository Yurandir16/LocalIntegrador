import { Code } from "../entities/code";

export interface codeRepository {
    addCode(code1: string,code2: string,code3: string,email_id: string):Promise<Code | null | string | Error> ;

    getCodeByEmail(email_id:string): Promise<Code[]>;
}