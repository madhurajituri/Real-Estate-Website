import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {getchats , getchat , readchat , createchat} from '../controllers/chat.controller.js';

const router = express.Router();

router.get("/" ,verifyToken, getchats);
router.get("/:id" ,verifyToken, getchat);
router.post("/" ,verifyToken , createchat);
router.put("/read/:id" ,verifyToken , readchat);

export default router;