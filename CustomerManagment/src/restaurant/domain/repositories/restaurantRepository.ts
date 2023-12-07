import { Restaurant } from "../entities/restaurant";

export interface RestaurantRepository {
    createRestaurant(name_local:string,description:string,gender:string,image:string,address:string,coordinate:string,status:boolean,user_id:string): Promise<Restaurant | null | string | Error> ;
    getRestaurant():Promise <Restaurant[]>;
    getRestaurantId(id:number):Promise <Restaurant|null|string|Error>;
    getRestaurantUser(user_id:string):Promise <Restaurant[]>;
    inactiveRestaurant(id:number,status:boolean): Promise <Restaurant>;
    updateRestaurant(id:number,name_local:string,description:string,gender:string,image:string,address:string,coordinate:string,status:boolean,user_id:string): Promise <Restaurant|null|string|Error>;
    getLocation(address:string): Promise <Restaurant[]>;
}
