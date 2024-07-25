import { Router } from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import { createEvent, editEvent, deleteEvent, joinEvent, declineEvent, getAllEvents, getUserEvents, getSuggestedEvents, getSingleEvent } from "../controllers/event.controller.js";

const router = Router();

router.use(authenticateToken);

router.post("/create", createEvent);
router.patch("/edit/:id", editEvent);
router.delete("/delete/:id", deleteEvent);
router.patch("/joinEvent/:id", joinEvent);
router.patch("/declineEvent/:id", declineEvent);
router.get("/getEvents", getAllEvents);
router.get("/:username/getUserEvents", getUserEvents);
router.get("/:id/getSuggestedEvents", getSuggestedEvents);
router.get("/:eventId", getSingleEvent);
export default router;