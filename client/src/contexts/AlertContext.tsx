import React, { createContext, useContext, useState, type ReactNode } from "react";

type AlertType = "success" | "error" | "info" | "warning";

interface Alert {
	message: string;
	type: AlertType;
}

interface AlertContextType {
	alert: Alert | null;
	showAlert: (message: string, type?: AlertType) => void;
	clearAlert: () => void;
}

interface AlertProviderType {
	children: ReactNode;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<AlertProviderType> = ({ children }) => {
	const [alert, setAlert] = useState<Alert | null>(null);

	const showAlert = (message: string, type: AlertType = "info") => {
		setAlert({ message, type });

		setTimeout(() => {
			setAlert(null);
		}, 4000);
	};

	const clearAlert = () => setAlert(null);

	return (
		<AlertContext.Provider value={{ alert, showAlert, clearAlert }}>
			{children}
			{alert && (
				<div
					className={`fixed bottom-5 right-5 px-4 py-3 rounded-lg shadow-lg text-white transition-opacity duration-300 z-50
					${getColorClass(alert.type)}`}
				>
					{alert.message}
				</div>
			)}
		</AlertContext.Provider>
	);
};

const getColorClass = (type: AlertType) => {
	switch (type) {
	case "success":
		return "bg-green-600";
	case "error":
		return "bg-red-600";
	case "warning":
		return "bg-yellow-500";
	case "info":
	default:
		return "bg-blue-600";
	}
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAlert = () => {
	const context = useContext(AlertContext);
	if (!context) throw new Error("useAlert deve ser usado dentro do AlertProvider");
	return context;
};