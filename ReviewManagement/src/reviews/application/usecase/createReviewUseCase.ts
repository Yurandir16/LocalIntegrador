import { validate } from "class-validator";
import { review } from "../../domain/entities/review";
import { IReviewRepository } from "../../domain/repositories/reviewRepository";
import { ValidatorCreateReview } from "../../domain/validations/reviews";


export class CreateReviewUseCase {
    constructor(readonly reviewRepository: IReviewRepository){}

    async run (
        message: string,
        userId: string,
        restaurantId: number,
    ): Promise<review | null | string | Error>{

        let data = new ValidatorCreateReview(message,userId,restaurantId);
        const validation = await validate(data)
        console.log(validation)
        if(validation.length > 0){
            throw new Error(JSON.stringify(validation))
        }

        try{
            const createReview = await this.reviewRepository.createReview(
                message,
                userId,
                restaurantId
            );

            return createReview;
        }catch (error) {
            return null;
        }
    }
}