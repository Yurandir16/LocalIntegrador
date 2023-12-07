import { Request, Response } from "express";
import fs from 'fs';
import path from "path";

//import { getPdfMenuCase } from "../../application/getpdfUseCase";

export class getPdfMenuController {
    // constructor(
    //     readonly getPdfMenuUseCase: getPdfMenuCase
    // ) { }

    async getPdfMenu(req: Request, res: Response) {
        const pdf = String(req.query.pdf);
        //const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        let reqP = path.join(__dirname, "../../../")
        console.log("data"+reqP)
        let img =reqP+`//pdf//${pdf}`;

        fs.access(img, fs.constants.F_OK, err => {
            console.log(`${pdf} ${err ? "no existe" : "existe"} `)
        });

        fs.readFile(img, async (err,data) =>{
            if(err){
                res.status(404).send({
                    status: "error",
                    data: "An error occurred",
                    message: '404 not found',
                });
            }else{
                if (pdf != null) {
                    res.writeHead(200, {'Content-Type' : 'application/pdf'});
                    res.write(data);
                    return res.end();
                } else {
                    res.status(400).send('I dont know, i get the pdf')
                }
            }
        })
    }
}