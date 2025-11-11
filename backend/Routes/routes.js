import express from "express";
import { createBooking, getHotelsByCity, loginUser, registerUser } from "../Controller/controller.js";
import { travelChatbot } from "../Controller/travelbot.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);







router.post("/travel-info", travelChatbot);
router.get("/hotels/:city", getHotelsByCity);


router.post("/booking", createBooking);

// GET /bookings/:userId - Get all bookings for a specific user
// router.get("/:userId", getUserBookings);
export default router;
