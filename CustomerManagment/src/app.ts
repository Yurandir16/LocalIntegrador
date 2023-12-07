import express from "express";
import "dotenv/config";
import { Signale } from 'signale';
import { restaurantRoute } from "./restaurant/infraestructure/routers/restsurantRouter";
import { menuRoute } from "./menu/infraestructure/routers/menuRouters";
import cors from 'cors';

const app = express();
const signale = new Signale();

app.use(cors());
app.use(express.json());
app.use('/restaurantService', restaurantRoute);
app.use('/menuService',menuRoute);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Corriendo en el puerto ${port}`);
});

