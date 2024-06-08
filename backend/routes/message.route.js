import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { addmessage } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/:chatid" ,verifyToken, addmessage);

export default router;