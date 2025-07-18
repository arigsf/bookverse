import { Router } from "express";
import { createUser } from "../controllers";

const router = Router();

router.get(
	"/",
	createUser
);

export default router;