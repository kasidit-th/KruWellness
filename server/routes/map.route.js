import { Router } from "express";
import { createPoints, postPoints } from "../controllers/map.controller.js";


const mapRouter = Router();

mapRouter.post('/createPoints' , createPoints);
mapRouter.post('/postPoints', postPoints);

export default mapRouter;