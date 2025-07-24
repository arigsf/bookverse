import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import clouds from "../assets/clouds.svg";
import { Button } from "../components/Button/index";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { user, handleLogin } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, [user, navigate]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await handleLogin(email, password);
	};

	return (
		<div className="min-h-screen flex flex-col md:flex-row bg-white">
			<div className="md:w-2/5 w-full flex items-center justify-center bg-repeat"
				style={{ backgroundImage: `url(${clouds})` }}></div>
			<div className="md:w-3/5 w-full flex items-center justify-center p-8">
				<form
					onSubmit={handleSubmit}
					className="bg-white w-full max-w-md space-y-6"
				>
					<h2 className="text-3xl font-bold text-center">Login</h2>

					<div>
						<label htmlFor="email" className="block text-sm font-medium mb-1">
							Email
						</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
						/>
					</div>

					<div>
						<label htmlFor="password" className="block text-sm font-medium mb-1">
							Senha
						</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
						/>
					</div>
					<Button type="submit">
						Entrar
					</Button>
				</form>
			</div>
		</div>
	);
}
