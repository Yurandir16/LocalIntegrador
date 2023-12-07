import expess from "express";
import { CcontrollerCreate, getCodeController } from "../dependencies";
export const codeRoute = expess.Router();

codeRoute.post("/create-code/",CcontrollerCreate.createCode.bind(CcontrollerCreate));

codeRoute.get("/getCodeByEmail/", getCodeController.getCodeByEmail.bind(getCodeController))