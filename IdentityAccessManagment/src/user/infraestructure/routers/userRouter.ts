import express from "express";
import { loginUserController, resgisterUserController, updatePasswordController, updateUserByIdController,usergetController } from "../dependencies";
import { validateToken } from "../../../helpers/veryfyToken";
import { Request, Response } from "express";

export const userRoutes = express.Router();

userRoutes.get('/rutine', (req: Request, res: Response) => {
    res.status(200).send('Rutina ejecutáda con éxito');
})
userRoutes.get('/:uuid',usergetController.getRestaurantId.bind(usergetController));
userRoutes.post('/',resgisterUserController.run.bind(resgisterUserController)) 

userRoutes.post('/login',loginUserController.run.bind(loginUserController))

userRoutes.put('/id',validateToken,updateUserByIdController.run.bind(updateUserByIdController))

userRoutes.put('/restar_password',updatePasswordController.run.bind(updatePasswordController))










