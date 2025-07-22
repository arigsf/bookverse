import { Request, Response } from "express";
import { sign, SignOptions } from "jsonwebtoken";
import { User } from "@prisma/client";

export function generateJWT(user: User, res: Response) {
	const body = {
		id: user.id,
		email: user.email,
		role: user.role,
		name: user.name,
		active: user.active,
	};

	const token = sign(
		{ user: body },
		process.env.SECRET_KEY as string,
		{ expiresIn: process.env.JWT_EXPIRATION || "15d" } as SignOptions
	);

	res.cookie("jwt", token, {
		httpOnly: true,
		secure: process.env.ENVIRONMENT === "production",
	});
}

export function cookieExtractor(req: Request) {
	let token = null;
	if (req && req.cookies) {
		token = req.cookies["jwt"];
	}

	return token;
}