import { Request, Response, NextFunction } from "express";
import UserService from "../services/UserService";
import statusCodes from "../../../../utils/constants/statusCodes";

export async function createUser(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const newUser = await UserService.create(req.body);
		res.status(statusCodes.CREATED).json(newUser);
	} catch (error) {
		next(error);
	}
}