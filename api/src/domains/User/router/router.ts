import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, myAccount, updateAccount, updateUser } from "../controllers";
import { notLoggedIn, verifyJWT } from "../../../../middlewares/auth";
import { login, logout } from "../controllers/auth";
import inputValidator from "../../../../middlewares/validatorHandler";

const router = Router();

router.get("/",	verifyJWT, getAllUsers);

router.get("/account", verifyJWT, myAccount);

router.get("/:id", verifyJWT, getUserById);

router.post("/", inputValidator("createUser"), createUser);

router.put("/account", inputValidator("updateAccount"), verifyJWT, updateAccount);

router.put("/:id", inputValidator("updateUser"), verifyJWT, updateUser);

router.delete("/:id", verifyJWT, deleteUser);

router.post("/login", inputValidator("login"), notLoggedIn, login);

router.post("/logout", inputValidator("idExists"), verifyJWT, logout);

export default router;