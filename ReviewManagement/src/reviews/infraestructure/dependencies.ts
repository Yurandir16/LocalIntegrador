import { MysqlReviewRepository } from "./repositories/mysqlReviewRepository";

import { CreateReviewUseCase } from "../application/usecase/createReviewUseCase";
import { CreateReviewController } from "./controllers/createController";

import { ListAllReviewUseCase } from "../application/usecase/listAllReviewUseCase";
import { ReviewsController } from "./controllers/listReviewController";

export const mysqlReviewRepository = new MysqlReviewRepository()

//Crear Review
export const createReviewUseCase = new CreateReviewUseCase(mysqlReviewRepository)
export const createReviewController = new CreateReviewController(createReviewUseCase)

//Visualizar Reviews
export const listReviewUseCase = new ListAllReviewUseCase(mysqlReviewRepository)
export const listReviewController = new ReviewsController(listReviewUseCase)