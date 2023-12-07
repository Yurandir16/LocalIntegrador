import {RestaurantRepository } from "../../domain/repositories/restaurantRepository";
import { Restaurant } from "../../domain/entities/restaurant";

export class getRestaurantCase {
    constructor(readonly MenuRepo: RestaurantRepository){}
    async getRestaurant():Promise<Restaurant[]>{
        try {
            const restaurant = await this.MenuRepo.getRestaurant();
            return restaurant || [];
        } catch (error) {
            return [];
        }
    }
}    
