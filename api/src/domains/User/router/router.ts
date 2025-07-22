import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers";
import { notLoggedIn, verifyJWT } from "../../../../middlewares/auth";
import { login, logout } from "../controllers/auth";

const router = Router();

router.get("/",	getAllUsers);

router.get("/:id", getUserById);

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.post("/login", notLoggedIn, login);

router.post("/logout", verifyJWT, logout);

export default router;