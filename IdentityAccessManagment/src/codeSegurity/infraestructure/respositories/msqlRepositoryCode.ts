import { query } from "../../../database/connection";
import { Code } from "../../domain/entities/code";
import { codeRepository } from "../../domain/repositories/codeResporitory";

export class CodeRepositoryr implements codeRepository {

    async addCode(code1:string,code2:string,code3:string,email_id:string): Promise<Code | null|Error> {
        
        try {
            console.log("Conexión exitosa a la BD");
            let sql = "INSERT INTO code (code1,code2,code3,email_id) VALUES (?,?,?,?)";
            const params: any[] = [code1,code2,code3,email_id];
            console.log(sql);
            const [result]: any = await query (sql,params);
            console.log(result);
            return new Code(code1,code2,code3, email_id, null);
        } catch (error) {
            console.log("Error adding menu:",error);
            return error as Error;
        }
    }

    async getCodeByEmail(email_id: string): Promise<Code[]> {
        try {
            const sql = `
            SELECT 
              c.id, 
              c.code1,
              c.code2,
              c.code3, 
              c.email_id, 
              JSON_OBJECT('name', u.name, 'email', u.email) as userInfo 
            FROM 
              code c 
            INNER JOIN 
              users u ON c.email_id = u.email
            WHERE
              c.email_id = ?; 
          `;
          const params: any[] = [email_id];
          const [rows]: any = await query(sql, params);

          return rows.map((row: any) => ({
            id: row.id,
            code1: row.code1,
            code2: row.code2,
            code3: row.code3,
            email_id: row.email_id,
            userInfo: row.userInfo
          }));
        } catch (error) {
            console.error('Error al listar revisiones:', (error as Error).message);
            throw new Error('Error al listar revisiones');
        }
    }
}