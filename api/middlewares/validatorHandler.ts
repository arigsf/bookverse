/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import statusCodes from "../utils/constants/statusCodes";
import { getValidator } from "./inputValidator";

const Validator = (validations: any) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		for (const val of validations){
			await val.run(req);
		}

		const errors = validationResult(req);
		if (errors.isEmpty()) {
			return next();
		}

		res.status(statusCodes.BAD_REQUEST).json({ errors: errors.array() });
	};
};

function inputValidator(method: any) {
	const validations = getValidator(method);
	return Validator(validations);
}

export default inputValidator;