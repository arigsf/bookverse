import statusCodes from "../utils/constants/statusCodes";
import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/NotAuthorizedError";
import { InvalidParamError } from "../errors/InvalidParamError";
import { TokenError } from "../errors/TokenError";
import { QueryError } from "../errors/QueryError";

export function errorHandler(
	error: Error,
	req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	next: NextFunction,
) {
	console.error(error);
	
	const message = error.message;
	let status = statusCodes.INTERNAL_SERVER_ERROR;

	if (error instanceof NotAuthorizedError) {
		status = statusCodes.FORBIDDEN;
	}

	if (error instanceof InvalidParamError) {
		status = statusCodes.BAD_REQUEST;
	}

	if (error instanceof TokenError) {
		status = statusCodes.NOT_FOUND;
	}

	if (error instanceof QueryError) {
		status = statusCodes.BAD_REQUEST;
	}

	res.status(status).json(message);
}