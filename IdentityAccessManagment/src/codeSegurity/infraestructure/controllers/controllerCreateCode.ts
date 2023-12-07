import { Request, Response } from "express";
import { CreateCodeCase } from "../../application/usaCase/createCode";
import { Code } from "../../domain/entities/code";

export class CodeControllerCreate {
    constructor(readonly createCodeUseCase: CreateCodeCase){}

    async createCode(req: Request, res: Response) {
        console.log("controller")
        try {
            
            let {
                code1,code2,code3,email_id
            }=req.body;

            let createCode = await this.createCodeUseCase.run(code1,code2,code3,email_id)
            if ( createCode instanceof Error) {
               return res.status(409).send({
                    status: "Error",
                    data: createCode.message
                });
            } 
            if (createCode instanceof Code){
                return res.status(201).send({
                    status:"success",
                    data:{
                        code1: createCode.code1,
                        code2:createCode.code2,
                        code3: createCode.code3,
                        email: createCode.email_id
                    }
                })
            }else{
                return res.status(500).send({
                    status:"error",
                    message:"An unexpected error occurred while create the menu"
                })
            }
        } catch (error) {
            return null;
        }
    }
}