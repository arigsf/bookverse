import { Navbar } from "../components/Navbar";
import { MainContainer } from "../components/Containers/MainContainer";
import { InputContainer } from "../components/Containers/InputContainer";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

interface ErrorMessage {
	name: string | null;
	email: string | null;
	password: string | null;
}

export default function Settings() {
	const { user } = useAuth();
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
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

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
									required
								/>
							</InputContainer>
							<InputContainer errorMessage={errorMessage.name}>
								<Input
									placeholder="Nome"
									type="text"
									value={form.name}
									onChange={(value) => handleInputChange("name", value)}
									error={!!errorMessage.name}
									required
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
							<Button type="submit">
								Salvar alterações
							</Button>
						</form>
					</div>
					<div>
						<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
							<h2 className="text-xl font-semibold pb-5">Zona de risco</h2>
							<Button variant="outlined" className="text-red-600 border-red-600 hover:bg-red-50">
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