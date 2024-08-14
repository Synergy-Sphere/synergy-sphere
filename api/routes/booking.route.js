import { Router } from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import { createCheckoutSession, deleteTickets, sessionStatus } from "../controllers/booking.controller.js";

const router = Router();

router.use(authenticateToken);

router.post("/create-checkout-session", createCheckoutSession);
router.get("/session-status", sessionStatus);
router.delete("/deleteTickets", deleteTickets)

export default router;