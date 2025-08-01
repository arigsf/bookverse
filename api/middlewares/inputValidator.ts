import { param, body } from "express-validator";

export const allowOnlyFields = (allowedFields: string[]) => {
	return body().custom((_value, { req }) => {

		const extras = Object.keys(req.body).filter(key => !allowedFields.includes(key));
		if (extras.length > 0) {
			throw new Error(`Campos não permitidos: ${extras.join(", ")}`);
		}
		return true;
	});
};

export const getValidator = (method: string) => {
	switch (method) {
		case "login": {
			return [
				allowOnlyFields(["email", "password"]),
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
		case "idExists": {
			return [
				param("id")
					.exists()
					.bail()
					.withMessage("O id é obrigatório")
					.notEmpty()
					.withMessage("O id deve ser válido"),
			];
		}
		case "createUser": {
			return [
				allowOnlyFields(["name", "email", "password"]),
				body("name")
					.exists()
					.bail()
					.withMessage("O nome é obrigatório.")
					.isAlpha("pt-BR", { ignore: " " })
					.withMessage("O nome deve conter apenas letras."),
				body("email")
					.exists()
					.bail()
					.withMessage("O email é obrigatório.")
					.isEmail()
					.withMessage("O email deve ser válido."),
				body("password")
					.exists()
					.withMessage("A senha é obrigatória.")
					.matches(
						/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
						"i"
					)
					.withMessage("A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial."),
			];
		}
		case "updateAccount": {
			return [
				allowOnlyFields(["name", "email", "password", "active"]),
				body("name")
					.optional()
					.isAlpha("pt-BR", { ignore: " " })
					.withMessage("O nome deve conter apenas letras."),
				body("email")
					.optional()
					.isEmail()
					.withMessage("O email deve ser válido."),
				body("password")
					.optional()
					.matches(
						/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
						"i"
					)
					.withMessage("A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial."),
				body("active")
					.optional()
					.isBoolean()
					.withMessage("O ativo deve ser verdadeiro ou falso"),
			];
		}
		case "updateUser": {
			return [
				param("id")
					.exists()
					.withMessage("O id é obrigatório.")
					.notEmpty()
					.withMessage("O id deve ser válido."),
				allowOnlyFields(["name", "email", "password", "active", "deactivationReason"]),
				body("name")
					.optional()
					.isAlpha("pt-BR", { ignore: " " })
					.withMessage("O nome deve conter apenas letras."),
				body("email")
					.optional()
					.isEmail()
					.withMessage("O email deve ser válido."),
				body("password")
					.optional()
					.matches(
						/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
						"i"
					)
					.withMessage("A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial."),
				body("active")
					.optional()
					.isBoolean()
					.withMessage("O ativo deve ser verdadeiro ou falso"),
			];
		}
	}
};