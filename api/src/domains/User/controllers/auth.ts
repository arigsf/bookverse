import { Request, Response, NextFunction } from "express";
import { compare } from "bcrypt";
import prisma from "../../../../config/prismaClient";
import { InvalidParamError } from "../../../../errors/InvalidParamError";
import statusCodes from "../../../../utils/constants/statusCodes";
import { NotAuthorizedError } from "../../../../errors/NotAuthorizedError";
import { generateJWT } from "../../../../utils/functions/auth";

export async function login(req: Request, res: Response, next: NextFunction) {
	try {
		const { email, password } = req.body;
		const user = await prisma.user.findUnique({ where: { email } });

		if (!user) {
			throw new InvalidParamError("Email e/ou senha incorretos.");
		}

		const matchingPassword = await compare(password, user.password);

		if (!matchingPassword) {
			throw new InvalidParamError("Email e/ou senha incorretos.");
		}

		if (!user.active && user.deactivatedBy === "ADMIN") {
			throw new NotAuthorizedError("Usuário desativado. Entre em contato com o suporte.");
		} else {
			await prisma.user.update({
				where: {
					email: email,
				},
				data: {
					active: true,
					deactivatedBy: null,
				}
			});
		}

		generateJWT(user, res);

		const returnUser = {
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
			active: user.active,
		};

		res.status(statusCodes.SUCCESS).json(returnUser);
	} catch (error) {
		next(error);
	}
}

export async function logout(req: Request, res: Response, next: NextFunction) {
	try {
		res.clearCookie("jwt");
		res.status(statusCodes.SUCCESS).json("Logout realizado com sucesso");
	} catch (error) {
		next(error);
	}
}