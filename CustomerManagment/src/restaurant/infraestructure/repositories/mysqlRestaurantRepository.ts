import { Restaurant } from "../../domain/entities/restaurant";
import { query } from "../../../database/connection";
import { RestaurantRepository } from "../../domain/repositories/restaurantRepository";
import axios from "axios";

export class RestaurantRepositoryr implements RestaurantRepository {
    

    async createRestaurant(name_local:string,description:string,gender:string,image:string,address:string,coordinate:string,status:boolean,user_id:string): Promise<Restaurant | null|Error> {
        try {
            
            console.log("Conexión exitosa a la BD");
            const sql = "INSERT INTO restaurant (name_local, description,gender, image, address,coordinate,status,user_id) VALUES (?,?,?,?,?,?,?,?)";
            console.log(sql);
            const params: any[] = [name_local,description,gender, image,address,coordinate,status,user_id];
            console.log(params)
            const [result]: any = await query(sql,params);
            console.log(result);
            return new Restaurant(name_local,description,gender, image,address,coordinate,status,user_id);
        } catch (error) {
            console.log("Error adding restaurant:",error);
            return error as Error;
        }
    }
    async getRestaurant(): Promise<any[]> {
        try {
            console.log("Conexión exitosa a la BD");
            let sql = "SELECT * FROM restaurant";
            const [rows]: any = await query(sql, []);
    
            console.log(rows);
    
            return rows.map((row: any) => ({id:row.id,name_local:row.name_local, description:row.description, gender:row.gender, image:row.image, address:row.address, coordinate:row.coordinate, status:row.status}));
        } catch (error) {
            console.log("Error fetching restaurant:", (error as Error).message);
            throw new Error('Error al listar restaurant');
        }
    }
    
    async getRestaurantId(id:number): Promise<any> {

        console.log(id)
        try {
            console.log("Conexión exitosa a la BD");
            const sql = "SELECT * FROM restaurant WHERE id = ?";
            const params: any[] = [id];
            console.log(sql);
            const [rows]: any = await query(sql, params);
            console.log(rows);

            if (rows[0]) {
                const restaurantData = {
                    id: rows[0].id,
                    name_local: rows[0].name_local,
                    description: rows[0].description,
                    gender: rows[0].gender,
                    image: rows[0].image,
                    address: rows[0].address,
                    coordinate: rows[0].coordinate,
                    status: rows[0].status,
                    user_id: rows[0].user_id,
                };
    
                return restaurantData;
            } else {
                throw new Error('No se encontró ningún restaurante con el ID proporcionado');
            }

        } catch (error) {
            console.log("Error fetching restaurant:", (error as Error).message);
            throw new Error('Error al encontrar restaurant');
        }  
    }

    async getRestaurantUser(user_id:string): Promise<any[]> {
        try {
            console.log("Conexión exitosa a la BD");
            console.log(user_id)
            const sql = "SELECT * FROM restaurant WHERE user_id = ?";
            const params: any[] = [user_id];
            console.log(sql);
            const [rows]: any = await query(sql, params);
            console.log(rows);
            if (rows[0]){
                return rows.map((row: any)=>({id:row.id,name_local:row.name_local, description:row.description, gender:row.gender, image:row.image, address:row.address, coodinate:row.coordinate, status:row.status}));

            }else{
                throw new Error('No se encontró ningún restaurante con el user_id proporcionado');
            }
        } catch (error) {
            console.log("Error fetching restaurant:", (error as Error).message);
            throw new Error('Error al listar restaurant');
        }    
    }
    async inactiveRestaurant(id:number,status:boolean): Promise<any> {
      
        try {
            console.log("Conexión exitosa a la BD");
            const sqlUpdate = "UPDATE restaurant SET status = ? WHERE id = ?";
            const paramsUpdate: any[] = [status, id];
            console.log(sqlUpdate);
            await query(sqlUpdate, paramsUpdate);
        
            const sqlSelect = "SELECT * FROM restaurant WHERE id = ?";
            const paramsSelect: any[] = [id];
            const [rows]: any = await query(sqlSelect, paramsSelect);
        
            return new Restaurant(rows[0].name_local, rows[0].description, rows[0].gender, rows[0].image, rows[0].address, rows[0].coordinate, rows[0].status, rows[0].user_id);
        } catch (error) {
            console.log("Error updating restaurant status:", error);
            return error as Error;
        }
        
    }
    async getLocation(address: string): Promise<any[]> {
        //console.log(address)
        try {
            console.log("Conexión exitosa a la BD");
            const sql = "SELECT * FROM restaurant WHERE address = ?";
            const params: any[] = [address];
            console.log(sql);
            const [rows]: any = await query(sql, params);
            console.log(rows);
            if (rows.length === 0) {
                throw new Error('No se encontraron restaurantes con la dirección proporcionada');
            }
            return rows.map((row: any)=>({id:row.id,name_local:row.name_local, description:row.description, gender:row.gender, image:row.image, address:row.address, coordinate:row.coordinate, status:row.status}));
        } catch (error) {
            console.log("Error fetching restaurant:", (error as Error).message);
            throw new Error('Error no hay restaurantes de esa lugar');
        }
    }

    async updateRestaurant(id:number,name_local:string,description:string,gender:string,image:string,address:string,coordinate:string,status:boolean,user_id:string): Promise<any> {
        try{
            console.log("Conexión exitosa a la BD");
            let sql = "UPDATE restaurant SET name_local = ?, description = ?, gender = ?, image = ?, address = ?, status = ? WHERE id = ?";
            const params: any[] = [id,name_local,description,gender,image,address,status];
            
            const [result]: any = await query (sql,params);
            return new Restaurant(name_local,description,gender, image,address,coordinate,status,user_id)
        }catch(error){
            console.log(error);
            return null;
        }    
    }
}