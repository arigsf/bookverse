export const validateName = (name: string): string | null => {
	if (!name.trim()) {
		return "Insira um nome.";
	}
	if (name.trim().length < 3) {
		return "O nome deve ter pelo menos 3 caracteres.";
	}
	return null;
};

export const validateEmailRequired = (email: string): string | null => {
	if (!email.trim()) {
		return "Insira um e-mail.";
	}
	return null;
};

export const validatePasswordRequired = (password: string): string | null => {
	if (!password.trim()) {
		return "Insira uma senha.";
	}
	return null;
};

export const validateEmailFormat = (email: string): string | null => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email.trim())) {
		return "O formato do e-mail é inválido.";
	}
	return null;
};

export function validatePasswordFormat(
	password: string,
	confirmPassword: string
): string | null {
	if (!password || !confirmPassword) {
		return "Preencha todos os campos de senha.";
	}
	if (password !== confirmPassword) {
		return "As senhas não coincidem.";
	}
	const criteria = {
		containsNumber: /\d/.test(password),
		containsUpper: /[A-Z]/.test(password),
		containsLower: /[a-z]/.test(password),
		containsSymbols: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]/.test(password),
		contains8: password.length >= 8,
	};
	const failed = Object.entries(criteria)
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		.filter(([_, valid]) => !valid)
		.map(([key]) => key);
	if (failed.length > 0) {
		const labels: Record<string, string> = {
			containsNumber: "número",
			containsUpper: "letra maiúscula",
			containsLower: "letra minúscula",
			containsSymbols: "símbolo",
			contains8: "8 caracteres",
		};
		return `A senha deve conter: ${failed.map((c) => labels[c]).join(", ")}.`;
	}
	return null;
}