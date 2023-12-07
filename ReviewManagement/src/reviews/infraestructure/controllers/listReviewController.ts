import { Request, Response } from "express";
import { ListAllReviewUseCase } from "../../application/usecase/listAllReviewUseCase";
import { review } from "../../domain/entities/review";
import axios from 'axios';

export class ReviewsController {
  constructor(
    readonly listAllReviewUseCase: ListAllReviewUseCase,
  ) { }

  async listAllReviews(req: Request, res: Response) {
    try {
      let restaurantId = Number(req.params.restaurantId);

      
      const id = Number(req.params.restaurantId);

      if (!restaurantId) {
          throw new Error('No se proporciono un restaurant_id.');
      }

      const url = `http://localhost:3000/api/v1/Restaurant/restaurantService/view-restaurant/${id}`;
      const response = await axios.get(url);

      console.log("Request successful. Data:", response.data);


      if (isNaN(restaurantId)) {
        return res.status(400).send({
          status: "Error",
          message: "restaurantId must be a number"
        });
      }

      let restaurantRes = await this.listAllReviewUseCase.run(restaurantId);

      if (restaurantRes instanceof Error) {
        // En caso de un error, considera devolver un estado 500 Internal Server Error
        return res.status(500).send({
          status: "Error",
          message: restaurantRes.message
        });
      }

      // Verifica si el resultado es un array vacío, en lugar de verificar si es una instancia de `review`
      if (Array.isArray(restaurantRes) && restaurantRes.length > 0) {
        return res.status(200).send({
          status: "success",
          data: restaurantRes,
          Restaurant:response.data
        });
      } else {
        return res.status(404).send({
          status: "Not Found",
          message: "No reviews found for the specified restaurantId"
        });
      }
    } catch (error) {
      // En caso de un error no controlado, devuelve un estado 500 Internal Server Error
      console.error("Unhandled error:", error);
      return res.status(500).send({
        status: "Error2",
        message: "An unexpected error occurred"
      });
    }
  }

}

