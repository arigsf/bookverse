import { Request, Response, NextFunction } from "express";
import UserService from "../services/UserService";
import statusCodes from "../../../../utils/constants/statusCodes";

export async function getAllUsers(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const users = await UserService.getAll();
		res.status(statusCodes.CREATED).json(users);
	} catch (error) {
		next(error);
	}
}

export async function getUserById(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const user = await UserService.getById(req.params.id);
		res.status(statusCodes.CREATED).json(user);
	} catch (error) {
		next(error);
	}
}

export async function createUser(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		await UserService.create(req.body);
		res.status(statusCodes.CREATED).json("Usuário cadastrado com sucesso!");
	} catch (error) {
		next(error);
	}
}

export async function updateUser(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		await UserService.update(req.params.id, req.body, req.user);
		res.status(statusCodes.CREATED).json("Usuário atualizado com sucesso!");
	} catch (error) {
		next(error);
	}
}

export async function deleteUser(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		await UserService.delete(req.params.id, req.user);
		res.status(statusCodes.CREATED).json("Usuário removido com sucesso!");
	} catch (error) {
		next(error);
	}
}