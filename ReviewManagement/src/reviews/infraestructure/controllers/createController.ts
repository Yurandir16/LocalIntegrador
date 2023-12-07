import { Request, Response } from "express";
import { CreateReviewUseCase } from "../../application/usecase/createReviewUseCase";
import { review } from "../../domain/entities/review";

export class CreateReviewController {
    constructor(readonly createReviewCase: CreateReviewUseCase){}
    async run(req: Request, res: Response) {
        console.log("controller")

        try {
            let message = req.body.message;
            let userId = req.body.userId;
            let restaurantId = Number(req.query.restaurantId);
            // let {
            //     message,
            //     userId,
            //     restaurantId
            // }= req.body

            let createReview = await this.createReviewCase.run(
                message,
                userId,
                restaurantId
            )
            if (createReview instanceof Error) {
                return res.status(409).send({
                    status: "error",
                    message: createReview.message
                });
            }
            if(createReview instanceof review) {
                return res.status(201).send({
                    status: "succes",
                    data: {
                        message: createReview.message,
                        userId: createReview.userId,
                        restaurantId: createReview.restaurantId
                    }
                })
            }
            else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while create the review."
                });
            }
        } catch (error) {
            return null;
        }
    }

}