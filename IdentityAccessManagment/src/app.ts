import express from "express";
import cors from "cors";
import "dotenv/config";
import { Signale } from 'signale';
import { userRoutes } from "./user/infraestructure/routers/userRouter";
import { codeRoute } from "./codeSegurity/infraestructure/routers/codeRouter";

import fileUpload from 'express-fileupload';


const app = express();
const signale = new Signale();


app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/v1/Code',codeRoute);

app.use('/', userRoutes);
// app.use('/api/v1/reviews', reviewRoutes);



const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Corriendo en el puerto ${port}`);
});


