import { Router } from "express";
import { editTimePresetValue } from "../controllers/timePresetValue.controller.js";

const timePresetValueRouter = Router();

timePresetValueRouter.post('/timePresetValue' , editTimePresetValue);

export default timePresetValueRouter;