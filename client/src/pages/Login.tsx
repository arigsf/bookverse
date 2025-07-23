import { useState } from "react";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log({ email, password });
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-myblue-light">
			<form
				onSubmit={handleSubmit}
				className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-6"
			>
				<h2 className="text-2xl font-bold text-center text-myblue-dark">
          			Login
				</h2>

				<div>
					<label className="block text-sm font-medium mb-1" htmlFor="email">
            			Email
					</label>
					<input
						id="email"
						type="email"
						className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-myblue-light"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>

				<div>
					<label className="block text-sm font-medium mb-1" htmlFor="password">
            			Senha
					</label>
					<input
						id="password"
						type="password"
						className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-myblue-light"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>

				<button
					type="submit"
					className="w-full bg-myblue-dark text-white py-2 rounded hover:bg-myblue-light transition-colors"
				>
					Entrar
				</button>
			</form>
		</div>
	);
}
