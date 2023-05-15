import express from "express";
import {
	addEmployee,
	getEmployees,
	getEmployee,
	updateEmployee,
	deleteEmployee,
} from "../controllers/employee.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addEmployee);
router.get("/", verifyToken, getEmployees);
router.get("/:id", verifyToken, getEmployee);
router.put("/:id", verifyToken, updateEmployee);
router.delete("/:id", verifyToken, deleteEmployee);

export default router;
