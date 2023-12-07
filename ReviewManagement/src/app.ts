import express from "express";
import cors from "cors";
import "dotenv/config";
import { Signale } from 'signale';
import { reviewRoutes } from "./reviews/infraestructure/routers/reviewRouter";
import fileUpload from 'express-fileupload';


const app = express();
const signale = new Signale();
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', reviewRoutes);

const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`Corriendo en el puerto ${port}`);
});


