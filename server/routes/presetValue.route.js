import { Router } from "express";
import { writePresetValue , editPresetValue, getPreset } from "../controllers/presetValue.controller.js";


const presetValueValueRouter = Router();

presetValueValueRouter.post('/presetValue/:id' , writePresetValue);
presetValueValueRouter.post('/presetValue' , editPresetValue);
presetValueValueRouter.get('/getPreset', getPreset);

export default presetValueValueRouter;

