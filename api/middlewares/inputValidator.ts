import { param, body } from "express-validator";

export const getValidator = (method: string) => {
	switch (method) {
		case "login": {
			return [
				body("email")
					.exists()
					.bail()
					.withMessage("O email é obrigatório.")
					.isEmail()
					.withMessage("O email deve ser válido."),
				body("password")
					.exists()
					.withMessage("A senha é obrigatória."),
			];
		}
	}
};