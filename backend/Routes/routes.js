import express from "express";
import { getHotelsByCity, loginUser, registerUser } from "../Controller/controller.js";
import { travelChatbot } from "../Controller/travelbot.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);







router.post("/travel-info", travelChatbot);
router.get("/hotels/:city", getHotelsByCity);



export default router;
