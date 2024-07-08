import { Router } from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import { createEvent, editEvent, deleteEvent, joinEvent, declineEvent } from "../controllers/event.controller.js";

const router = Router();

router.use(authenticateToken);

router.post("/create", createEvent);
router.patch("/edit/:id", editEvent);
router.delete("/delete/:id", deleteEvent);
router.patch("/joinEvent/:id", joinEvent);
router.patch("/declineEvent/:id", declineEvent);

export default router;