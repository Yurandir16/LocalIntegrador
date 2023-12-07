import { MenuRepositoryr } from "./repositories/mysqMenuRepository";
import { MenuControllerCreate } from "./controllers/createMenuController";
import { CreateMenuCase } from "../application/usesCase/createMenuUseCase";
import { MenuControllerGet } from "./controllers/getMenuController";
import { getMenuCase } from "../application/usesCase/getMenuUseCase";
import { MenuControllerUpdate } from "./controllers/updateMenuController";
import { UpdateMenuCase } from "../application/usesCase/updateMenuUseCase";
import { getPdfMenuController } from "./controllers/getPdfController";
//import { getPdfMenuCase } from "../application/getpdfUseCase";

const MenuRepository = new MenuRepositoryr()

export const createM = new CreateMenuCase(MenuRepository);
export const getM = new getMenuCase(MenuRepository);
export const updateM = new UpdateMenuCase(MenuRepository);
//export const pdfM = new getPdfMenuCase(MenuRepository);

export const McontrollerCreate = new MenuControllerCreate(createM);
export const McontrollerGet = new MenuControllerGet(getM);
export const McontrollerUpdate = new MenuControllerUpdate(updateM);
export const McontrollerPdf = new getPdfMenuController();