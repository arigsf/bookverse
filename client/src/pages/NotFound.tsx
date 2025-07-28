import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export default function NotFound() {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen flex items-center justify-center flex-col">
			<h1 className="text-4xl font-bold mb-3">404</h1>
			<p className="text-xl text-gray-600">Página não encontrada</p>
			<Button onClick={() => navigate("/")} className="mt-5 mb-3 max-w-xs">Voltar para a Home</Button>
			<Button onClick={() => navigate(-1)} variant="outlined" className="max-w-xs text-gray-700 border-gray-400 hover:bg-gray-50">Voltar para a página anterior</Button>
		</div>
	);
}