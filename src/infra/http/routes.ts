import express from "express";
import { ConsultantController } from "../../controllers/Consultant";


const routers = express.Router();
const consultantController = new ConsultantController();

routers.get(
  "/consultants",
  consultantController.getAll.bind(consultantController)
);

routers.get(
  "/consultants/:id",
  consultantController.getById.bind(consultantController)
);
routers.post(
  "/consultants",
  consultantController.register.bind(consultantController)
);

export default routers;
