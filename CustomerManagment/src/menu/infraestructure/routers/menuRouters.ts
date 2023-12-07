import expess from "express";
import multer from 'multer';
import { McontrollerCreate,McontrollerGet,McontrollerUpdate,McontrollerPdf } from "../dependencies";
export const menuRoute = expess.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './src/pdf');
    },
    filename: (req, file, cb) => {
      const ext = file.originalname.split('.').pop();
      console.log(file.originalname);
      cb(null, `${file.originalname}`);
    },
});

const upload = multer({ storage });

menuRoute.post("/create-menu/:restaurant_id",upload.single('pdf'),McontrollerCreate.createRestaurant.bind(McontrollerCreate));
menuRoute.get("/view-menu/:restaurant_id",McontrollerGet.getMenu.bind(McontrollerGet));
menuRoute.put("/update-menu/:id",upload.single('pdf'),McontrollerUpdate.updateMenu.bind(McontrollerUpdate));
menuRoute.get("/view-pdf/",McontrollerPdf.getPdfMenu.bind(McontrollerPdf));