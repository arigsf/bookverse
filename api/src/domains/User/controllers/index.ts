import { Request, Response, NextFunction } from "express";
import UserService from "../services/UserService";
import statusCodes from "../../../../utils/constants/statusCodes";

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
		res.status(statusCodes.CREATED).json("Usuário cadastrado com sucesso!");
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
		res.status(statusCodes.CREATED).json("Usuário cadastrado com sucesso!");
	} catch (error) {
		next(error);
	}
}