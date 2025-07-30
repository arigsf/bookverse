import { useState } from "react";
import { Button } from "../components/Button/index";
import { InputContainer } from "../components/Containers/InputContainer";
import { Input } from "../components/Input";
import type { Login } from "../types/userTypes";
import clouds from "../assets/clouds.svg";
import logo from "../assets/logo.png";
import { useAuth } from "../hooks/useAuth";
import { useAlert } from "../hooks/useAlert";
import axios from "axios";

interface ErrorMessage {
	email: string | null;
	password: string | null;
}

export default function Login() {
	const { handleLogin } = useAuth();
	const { showAlert } = useAlert();

	const [form, setForm] = useState<Login>({ email: "", password: "" });
	const [errorMessage, setErrorMessage] = useState<ErrorMessage>({
		email: null,
		password: null,
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await handleLogin(form.email, form.password);
		} catch (error) {
			let message = "Erro ao logar.";

			if (axios.isAxiosError(error) && error.response) {
				message = error.response.data || error.message;
			} else if (error instanceof Error) {
				message = error.message;
			}

			showAlert(message, "error");
		}
	};

	const handleEmailChange = (value: string): void => {
		setForm((prev) => ({ ...prev, email: value }));
		if (errorMessage.email) {
			setErrorMessage((prevState) => ({ ...prevState, email: null }));
		}
	};

	const handlePasswordChange = (value: string): void => {
		setForm((prev) => ({ ...prev, password: value }));
		if (errorMessage.password) {
			setErrorMessage((prevState) => ({ ...prevState, password: null }));
		}
	};

	return (
		<div className="min-h-screen flex flex-col justify-center md:flex-row">
			<div className="md:w-5/12 w-full flex items-center justify-center bg-repeat"
				style={{ backgroundImage: `url(${clouds})` }}></div>
			<div className="md:w-7/12 w-full flex items-center justify-center p-8">
				<form
					id="login-form"
					onSubmit={handleSubmit}
					className="bg-white w-full max-w-md space-y-6"
				>
					<img
						src={logo}
						alt="Logo"
						className="w-1/2 h-auto mx-auto"
					/>
					<InputContainer errorMessage={errorMessage.email} className="max-w">
						<Input
							placeholder="E-mail"
							type="email"
							value={form.email}
							onChange={handleEmailChange}
							error={!!errorMessage.email}
							required
						/>
					</InputContainer>
					<InputContainer errorMessage={errorMessage.password} className="max-w">
						<Input
							placeholder="Senha"
							type="password"
							value={form.password}
							onChange={handlePasswordChange}
							error={!!errorMessage.password}
							required
						/>
					</InputContainer>
					<Button type="submit">
						Entrar
					</Button>
				</form>
			</div>
		</div>
	);
}
