import { query } from "../../../database/connection";
// import { query2 } from "../../database/connection";
import { review } from "../../domain/entities/review";
import { IReviewRepository } from "../../domain/repositories/reviewRepository";


export class MysqlReviewRepository implements IReviewRepository {

    async createReview( message: string, userId: string, restaurantId: number): Promise<string | review | Error | null> {
        
        try{
            let sql = "INSERT INTO reviews(message,userId,restaurantId) VALUES (?,?,?)";
            const params: any[] = [message, userId,restaurantId];
            console.log(sql)
            console.log(params)
            const [result]: any = await query(sql,params);
            console.log(result);
            return new review(message,userId,restaurantId,null);

        }catch (error) {
            console.error("Error adding review:", error);
            return error as Error;
        }
    }

    async listAllReviews(restaurantId: number): Promise<any[]> {
      try {
        const sql = "SELECT * FROM reviews  WHERE restaurantId = ?";
        const params: any[] = [restaurantId];
        const [rows]: any = await query(sql, params);
        if (rows[0]){
            return rows.map((row: any) => ({id: row.id,message: row.message,userId: row.userId}));
        }else{
            throw new Error('No se encontró ningún review con el restaurantId proporcionado');

        }
        
      } catch (error) {
        console.error('Error al listar revisiones:', (error as Error).message);
        throw new Error('Error al listar revisiones');
      }
    }
    
    
    
    
    

}

// async listAllPayments(): Promise<any[]> {
//   try {
//     const sql = `
//       SELECT p.id, p.amount, p.payment_date, p.status, p.token,p.metaData,p.id_contract,p.id_payment_method,p.id_card,p.id_user, JSON_OBJECT('id', u.id, 'email', u.email) as user_info
//       FROM payment p INNER JOIN user u ON p.id_user = u.id
//     `;
//     const params: any[] = [];
//     const rows: any[] = await query(sql, params);
//     console.log(rows) // Utilizamos "rows" para obtener múltiples resultados

//     if (rows && rows.length > 0) {
//       return rows; // Devolvemos un array con todos los pagos encontrados
//     } else {
//       return []; // En caso de que no se encuentren resultados, devolvemos un array vacío
//     }
//   } catch (error) {
//     console.error('Error al listar usuarios:', (error as Error).message);
//     throw new Error('Error al listar usuarios');
//   }
// }