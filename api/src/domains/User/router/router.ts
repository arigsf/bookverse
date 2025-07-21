import { Router } from "express";
import { createUser, deleteUser, updateUser } from "../controllers";

const router = Router();

router.post(
	"/",
	createUser
);

router.put(
	"/",
	updateUser
);

router.delete(
	"/",
	deleteUser
);

export default router;