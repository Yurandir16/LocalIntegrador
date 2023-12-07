import { RestaurantControllerCreate } from "./controllers/controllerCreatreRestaurant";
import { RestaurantControllerGet } from "./controllers/controllerGetRestaurant";
import { RestaurantRepositoryr } from "./repositories/mysqlRestaurantRepository";
import { CreateRestaurantCase } from "../application/usesCase/createRestaurantUseCase";
import { getRestaurantCase } from "../application/usesCase/getRestaurantUseCase";
import { getRestaurantIdCase } from "../application/usesCase/getRestaurantIdUseCase";
import { RestaurantControllerGetId } from "./controllers/controllerGetRestaurantId";
import { RestaurantControllerGetUser } from "./controllers/controllerGetRestaurantUser";
import { getUserRestaurantCase } from "../application/usesCase/getRestaurantUserUseCase";
import { inactiveRestaurantCase } from "../application/usesCase/inactiveRestaurantUseCase";
import { inactiveRestaurantController } from "./controllers/controllerInactiveRestaurant";
import { updateRestaurantController } from "./controllers/controllerUpdateRestaurant";
import { UpdateRestaurantCase } from "../application/usesCase/updateRestaurantUseCase";
import { getImageRestaurantController } from "./controllers/controllerGetImagen";
import { getLocationRestaurantCase } from "../application/usesCase/getLocationRestaurant";
import { RestaurantLocationControllerGet } from "./controllers/controllerGetLocation";

const RestaurantRepository = new RestaurantRepositoryr()

export const createRes = new CreateRestaurantCase(RestaurantRepository);
export const getRes = new getRestaurantCase(RestaurantRepository);
export const getResId = new getRestaurantIdCase(RestaurantRepository);
export const getResUser = new getUserRestaurantCase(RestaurantRepository);
export const inactiveRestaurant = new inactiveRestaurantCase(RestaurantRepository);
export const updateRes = new UpdateRestaurantCase(RestaurantRepository);
export const getLocationRes = new getLocationRestaurantCase(RestaurantRepository);

export const ResControllerCreate = new RestaurantControllerCreate(createRes);
export const ResControllerGet = new RestaurantControllerGet(getRes);
export const ResControllerGetId = new RestaurantControllerGetId(getResId);
export const ResControllerGetUser = new RestaurantControllerGetUser(getResUser);
export const ResControllerInactive = new inactiveRestaurantController(inactiveRestaurant);
export const ResControllerUpdate = new updateRestaurantController(updateRes);
export const ResControllerImage = new getImageRestaurantController();
export const ResControllerLocation = new RestaurantLocationControllerGet(getLocationRes);