import { review } from "../entities/review";

export interface IReviewRepository {
    createReview(
        // id: number,
        message: string,
        userId: string,
        restaurantId: number
    ): Promise<review | null | string | Error>;

    listAllReviews(restaurantId:number): Promise<review[]>;
}