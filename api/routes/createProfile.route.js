import { Router } from "express";
import {updateProfilePicture,updateBio,updateLocation } from "../controllers/createProfile.controller.js";
import authenticateToken from "../middleware/authenticateToken.js";

const router = Router();

router.patch("/:id/profilePicture", authenticateToken, updateProfilePicture);
router.patch("/:id/bio", authenticateToken, updateBio);
// router.patch("/:id/coverPicture", authenticateToken, updateCoverPicture);
router.patch("/:id/location", authenticateToken, updateLocation);


export default router;