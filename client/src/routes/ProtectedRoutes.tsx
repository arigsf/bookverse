import { useRoutes } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import RouterObject from "./RouterObject";

export default function ProtectedRoutes() {
	const { user } = useAuth();
	const isLogged = !!user;

	return useRoutes(RouterObject(isLogged));
}
