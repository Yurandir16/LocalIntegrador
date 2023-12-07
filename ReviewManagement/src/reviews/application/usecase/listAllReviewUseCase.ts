import { validate } from "class-validator";
import { review } from "../../domain/entities/review";
import { IReviewRepository } from "../../domain/repositories/reviewRepository";
import { ValidationRestaurantGet } from "../../domain/validations/reviews";

export class ListAllReviewUseCase {
    constructor(readonly reviewRepository: IReviewRepository){}
    async run(restaurantId:number) {
        let data = new ValidationRestaurantGet(restaurantId);

        const validation = await validate(data)
        if (validation.length > 0){
        throw new Error(JSON.stringify(validation))
        }

        try {
            const restaurantRes = await this.reviewRepository.listAllReviews(
                restaurantId
            );
            return restaurantRes;
        }catch (error) {
            return null;
        }
    }
}

// async run(user_id:number){
        
//     let data = new ValidationUserGet(user_id);
    
//     const validation = await validate(data)
//     console.log(validation)
//     if (validation.length > 0){
//         throw new Error(JSON.stringify(validation))
//     }

//     try {
//         const userRes = await this.RestaurantRepo.getRestaurantUser(
//             user_id
//         );
//         return userRes;
//     } catch (error) {
//         return null;
//     }
// }