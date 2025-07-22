import { Request, Response, NextFunction } from "express";
import { JwtPayload, TokenExpiredError, verify } from "jsonwebtoken";
import { cookieExtractor } from "../utils/functions/auth";
import statusCodes from "../utils/constants/statusCodes";
import { LoginError } from "../errors/LoginError";
import { TokenError } from "../errors/TokenError";

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
	try {
		const token = cookieExtractor(req);

		if (token) {
			const decoded = verify(token, process.env.SECRET_KEY || "") as JwtPayload;
			req.user = decoded.user;
		}
		if (req.user === null || req.user === undefined) {
			throw new TokenError("Você precisa estar logado para realizar essa ação!");
		}
		next();
	} catch (error) {
		if (error instanceof TokenExpiredError) {
			res.clearCookie("jwt");
			throw new TokenExpiredError("Sessão expirada! Faça login novamente.", error.expiredAt);
		}
		next(error);
	}
}

export const checkRole = (roles: Array<string>) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			if (!roles.includes(req.user.role)) {
				res.status(statusCodes.UNAUTHORIZED).json("Você não tem permissão suficiente para realizar essa ação!");
			}
			next();
		} catch (error) {
			next(error);
		}
	};
};

export function notLoggedIn(req: Request, res: Response, next: NextFunction) {
	try {
		const token = cookieExtractor(req);

		if (token) {
			const decoded = verify(token, process.env.SECRET_KEY || "");
			if (decoded) {
				throw new LoginError("Você já está logado no sistema!");
			}
		}
		next();
	} catch (error) {
		if (error instanceof TokenExpiredError) {
			res.clearCookie("jwt");
			next();
		} else {
			next(error);
		}
	}
}