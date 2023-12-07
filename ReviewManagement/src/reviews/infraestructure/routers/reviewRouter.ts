import express from "express";
import { createReviewController,listReviewController } from "../dependencies";
import { Request, Response } from "express";

export const reviewRoutes = express.Router();


reviewRoutes.get('/rutine', (req: Request, res: Response) => {
    res.status(200).send('Rutina ejecutáda con éxito');
})
reviewRoutes.post('/create', createReviewController.run.bind(createReviewController))

reviewRoutes.get('/list/:restaurantId', listReviewController.listAllReviews.bind(listReviewController))