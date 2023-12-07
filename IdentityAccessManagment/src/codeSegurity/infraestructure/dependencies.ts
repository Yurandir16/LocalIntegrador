import { CodeRepositoryr } from "./respositories/msqlRepositoryCode";
import { CodeControllerCreate } from "./controllers/controllerCreateCode";
import { CreateCodeCase } from "../application/usaCase/createCode";

import { GetCodeByEmail } from "../application/usaCase/getCodeByEmail";
import { CodeController } from "./controllers/controllerGetByEmail";


const codeRepository = new CodeRepositoryr()

const addCode = new CreateCodeCase(codeRepository);

export const CcontrollerCreate = new CodeControllerCreate(addCode);

const getCodeUseCase = new GetCodeByEmail(codeRepository);
export const getCodeController = new CodeController(getCodeUseCase);