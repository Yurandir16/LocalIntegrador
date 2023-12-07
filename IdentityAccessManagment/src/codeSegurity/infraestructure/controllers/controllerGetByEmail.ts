import { Request, Response } from "express";
import { GetCodeByEmail } from "../../application/usaCase/getCodeByEmail";

export class CodeController {
    constructor(
        readonly getCodeUseCase : GetCodeByEmail,
    ){}

    async getCodeByEmail(req: Request, res: Response) {
        try {
            let email_id = String(req.query.email_id);

            let codeRes = await this.getCodeUseCase.run(email_id);

            if (codeRes instanceof Error) {
                // En caso de un error, considera devolver un estado 500 Internal Server Error
                return res.status(500).send({
                  status: "Error",
                  message: codeRes.message
                });
              }

              if (Array.isArray(codeRes) && codeRes.length > 0) {
                return res.status(200).send({
                  status: "success",
                  data: codeRes
                });
              } else {
                return res.status(404).send({
                  status: "Not Found",
                  message: "No reviews found for the specified emailId"
                });
              }

        }catch (error) {
            console.error("Unhandled error:", error);
            return res.status(500).send({
              status: "Error",
              message: "An unexpected error occurred"
            });
        }
    }
}