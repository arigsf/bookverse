import { useContext } from "react";
import { AlertContext } from "../contexts/AlertContext";

export function useAlert() {
	const context = useContext(AlertContext);
	if (!context) {
		throw new Error("useAlert deve ser usado dentro do AlertProvider");
	}
	return context;
};