// routes/config.routes.js
import { Router } from "express";
import { getAll, getById, create, update, remove } from "../controllers/config.controller.js";

const router = Router();

router.get("/users", getAll);
router.get("/users/:id", getById);
router.post("/users", create);
router.put("/users/:id", update);
router.delete("/users/:id", remove);

export default router;
