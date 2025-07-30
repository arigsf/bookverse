import { Navbar } from "../components/Navbar";
import { MainContainer } from "../components/Containers/MainContainer";
import { InputContainer } from "../components/Containers/InputContainer";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useState } from "react";
import { validateEmailFormat, validateEmailRequired, validateName, validatePasswordFormat } from "../utils/userValidations";
import { updateAccount } from "../../api/user";
import { useAlert } from "../hooks/useAlert";
import { useAuth } from "../hooks/useAuth";
import type { UpdateAccount } from "../types/userTypes";
import axios from "axios";

interface ErrorMessage {
	name: string | null;
	email: string | null;
	password: string | null;
	checkPassword: string | null;
}

export default function Settings() {
	const { user } = useAuth();
	const { showAlert } = useAlert();

	const [form, setForm] = useState({
		email: user?.email || "",
		name: user?.name || "",
		password: "",
		checkPassword: "",
	});
	const [errorMessage, setErrorMessage] = useState<ErrorMessage>({
		name: null,
		email: null,
		password: null,
		checkPassword: null,
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const isSameEmail = form.email === user?.email;
		const isSameName = form.name === user?.name;
		const isPasswordEmpty = !form.password.trim();

		if (isSameEmail && isSameName && isPasswordEmpty) {
			showAlert("Nenhuma alteração foi feita nos campos.", "warning");
			return;
		}

		if (!validateForm()) {
			return;
		}

		const userData: UpdateAccount = {};

		if (form.email && form.email !== user?.email) {
			userData.email = form.email;
		}

		if (form.name && form.name !== user?.name) {
			userData.name = form.name;
		}

		if (form.password.trim()) {
			userData.password = form.password;
		}

		try {
			const res = await updateAccount(userData);
			showAlert(res, "success");
		} catch (error) {
			let message = "Erro ao atualizar dados da conta.";

			if (axios.isAxiosError(error) && error.response) {
				message = error.response.data || error.message;
			} else if (error instanceof Error) {
				message = error.message;
			}

			showAlert(message, "error");
		}
	};

	const validateForm = () => {
		let isValid = true;
		const newErrors: ErrorMessage = {
			name: null,
			email: null,
			password: null,
			checkPassword: null,
		};

		const nameError = validateName(form.name);
		if (nameError) {
			newErrors.name = nameError;
			isValid = false;
		}

		const emailRequiredError = validateEmailRequired(form.email);
		const emailFormatError = validateEmailFormat(form.email);

		if (emailRequiredError) {
			newErrors.email = emailRequiredError;
			isValid = false;
		} else if (emailFormatError) {
			newErrors.email = emailFormatError;
			isValid = false;
		}

		if (form.password.trim()) {
			const passwordError = validatePasswordFormat(
				form.password,
				form.checkPassword
			);
			if (passwordError) {
				newErrors.password = passwordError;
				newErrors.checkPassword = passwordError;
				isValid = false;
			}
		}

		setErrorMessage(newErrors);
		return isValid;
	};

	const handleInputChange = (field: string, value: string) => {
		setForm((prev) => ({
			...prev,
			[field]: value,
		}));

		setErrorMessage((prev) => ({
			...prev,
			[field]: "",
		}));
	};

	const handleDisableAccount = async () => {
		const userData: UpdateAccount = {
			active: false,
		};

		try {
			await updateAccount(userData);
		} catch (error) {
			let message = "Erro ao desativar conta.";

			if (axios.isAxiosError(error) && error.response) {
				message = error.response.data || error.message;
			} else if (error instanceof Error) {
				message = error.message;
			}

			showAlert(message, "error");
		}
	};

	return (
		<>
			<Navbar></Navbar>
			<MainContainer>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
						<h2 className="text-xl font-semibold pb-5">Informações da conta</h2>
						<form
							id="settings-form"
							onSubmit={handleSubmit}
							className="bg-white w-full space-y-6"
						>
							<InputContainer errorMessage={errorMessage.email}>
								<Input
									placeholder="E-mail"
									type="email"
									value={form.email}
									onChange={(value) => handleInputChange("email", value)}
									error={!!errorMessage.email}
								/>
							</InputContainer>
							<InputContainer errorMessage={errorMessage.name}>
								<Input
									placeholder="Nome"
									type="text"
									value={form.name}
									onChange={(value) => handleInputChange("name", value)}
									error={!!errorMessage.name}
								/>
							</InputContainer>
							<InputContainer errorMessage={errorMessage.password}>
								<Input
									placeholder="Senha"
									type="password"
									value={form.password}
									onChange={(value) => handleInputChange("password", value)}
									error={!!errorMessage.password}
								/>
							</InputContainer>
							<InputContainer errorMessage={errorMessage.password}>
								<Input
									placeholder="Confirmar senha"
									type="password"
									value={form.checkPassword}
									onChange={(value) => handleInputChange("checkPassword", value)}
									error={!!errorMessage.checkPassword}
								/>
							</InputContainer>
							<Button type="submit">
								Salvar alterações
							</Button>
						</form>
					</div>
					<div>
						<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
							<h2 className="text-xl font-semibold pb-5">Zona de risco</h2>
							<Button variant="outlined" className="text-red-600 border-red-600 hover:bg-red-50" onClick={handleDisableAccount}>
								Desativar minha conta
							</Button>
							<Button variant="outlined" className="mt-5 text-red-600 border-red-600 hover:bg-red-50">
								Excluir minha conta
							</Button>
						</div>
					</div>
				</div>
			</MainContainer>
		</>
	);
}