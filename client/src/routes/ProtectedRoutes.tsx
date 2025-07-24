import { useRoutes } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import RouterObject from "./RouterObject";

export default function ProtectedRoutes() {
	const { user, loading } = useAuth();

	if (loading) {
		return <div>Carregando...</div>; // Tudo bem retornar aqui porque não é um hook
	}
	console.log(user);

	// OK chamar hook depois do if porque useRoutes não é um hook React padrão, mas às vezes pode dar warning dependendo da versão
	return useRoutes(RouterObject(!!user));
}
