import express from "express";
import multer from "multer";
import { ResControllerCreate,ResControllerGet,ResControllerGetId,ResControllerGetUser,ResControllerInactive,ResControllerUpdate,ResControllerImage,ResControllerLocation } from "../dependencies";
import { validateToken } from "../../../helpers/verifyToken";
import { Request, Response } from "express";
export const restaurantRoute = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './src/assets');
    },
    filename: (req, file, cb) => {
      const ext = file.originalname.split('.').pop();
      console.log(file.originalname);
      cb(null, `${file.originalname}`);
    },
});

const upload = multer({ storage });

restaurantRoute.get('/rutine', (req: Request, res: Response) => {
  res.status(200).send('Rutina ejecutáda con éxito');
})

restaurantRoute.post("/create-restaurant/", validateToken,upload.single('image'),ResControllerCreate.createRestaurant.bind(ResControllerCreate));
restaurantRoute.get("/view-restaurants/", ResControllerGet.getRestaurant.bind(ResControllerGet))
restaurantRoute.get("/view-restaurant/:id", ResControllerGetId.getRestaurantId.bind(ResControllerGetId));
restaurantRoute.get("/view-restaurants-user/:user_id",ResControllerGetUser.getRestaurantUser.bind(ResControllerGetUser));
restaurantRoute.put("/inactive-restaurant/", ResControllerInactive.inactiveRestaurant.bind(ResControllerInactive));
restaurantRoute.put("/update-restaurant/:id", upload.single('image'),ResControllerUpdate.updateRestaurant.bind(ResControllerUpdate));
restaurantRoute.get("/view-image/",ResControllerImage.getImageRestaurant.bind(ResControllerImage));
restaurantRoute.get("/view-locationR/",ResControllerLocation.getRestaurantlocation.bind(ResControllerLocation));