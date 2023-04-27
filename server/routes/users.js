import express from "express";
import { updateUser } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.put("/:id", verifyToken, updateUser);
export default router;
