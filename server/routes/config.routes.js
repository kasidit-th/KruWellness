import { Router } from "express";
import { updateZoneTimeName, updateZonePresetName , createZone , editZone , deleteZone } from "../controllers/config.controller.js";

const ZoneTimeNameRouter = Router();
const ZonePresetNameRouter = Router();
const CreateZone = Router()
const EditZone = Router();
const DeleteZone = Router();

ZoneTimeNameRouter.post('/ZoneTimeName' , updateZoneTimeName);
ZonePresetNameRouter.post('/ZonePresetName', updateZonePresetName);
CreateZone.post('/createZone' , createZone);
EditZone.post('/editZone', editZone);
DeleteZone.post('/deleteZone', deleteZone);

export { ZoneTimeNameRouter, ZonePresetNameRouter , CreateZone , EditZone , DeleteZone };
