import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, myAccount, updateUser } from "../controllers";
import { notLoggedIn, verifyJWT } from "../../../../middlewares/auth";
import { login, logout } from "../controllers/auth";

const router = Router();

router.get("/",	verifyJWT, getAllUsers);

router.get("/account", verifyJWT, myAccount);

router.get("/:id", verifyJWT, getUserById);

router.post("/", createUser);

router.put("/:id", verifyJWT, updateUser);

router.delete("/:id", verifyJWT, deleteUser);

router.post("/login", notLoggedIn, login);

router.post("/logout", verifyJWT, logout);

export default router;