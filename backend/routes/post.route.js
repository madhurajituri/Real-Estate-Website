import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createpost, deletepost, getpost, getposts, updatepost ,savepost } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/" , getposts);
router.get("/:id" , getpost);
router.post("/" ,verifyToken , createpost);
router.put("/:id" ,verifyToken , updatepost);
router.delete("/:id" ,verifyToken, deletepost);
router.post("/:id" ,verifyToken, savepost);

export default router;