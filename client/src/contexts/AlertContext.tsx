import React, { createContext, useRef, useState, type ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";

type AlertType = "success" | "error" | "info" | "warning";

interface Alert {
	message: string;
	type: AlertType;
}

interface ValidatorErrors {
	errors: { msg: string } [];
};

interface AlertContextType {
	alert: Alert | null;
	showAlert: (message: string | ValidatorErrors, type?: AlertType) => void;
	clearAlert: () => void;
}

interface AlertProviderType {
	children: ReactNode;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<AlertProviderType> = ({ children }) => {
	const [alert, setAlert] = useState<Alert | null>(null);
	const timeoutId = useRef<NodeJS.Timeout | null>(null);

	const showAlert = (message: string | ValidatorErrors, type: AlertType = "info") => {
		let alertMessage = "";

		if (typeof message === "string") {
			alertMessage = message;
		} else if(message && Array.isArray(message.errors)){
			alertMessage = message.errors.map((e) => e.msg).join(", ");
		}

		setAlert({ message: alertMessage, type });

		if (timeoutId.current) {
			clearTimeout(timeoutId.current);
		}

		timeoutId.current = setTimeout(() => {
			setAlert(null);
			timeoutId.current = null;
		}, 4000);
	};

	const clearAlert = () => setAlert(null);

	const Icon = getIcon(alert?.type);

	return (
		<AlertContext.Provider value={{ alert, showAlert, clearAlert }}>
			{children}
			{alert && (
				<div
					className={`fixed bottom-5 right-5 flex items-center max-w-sm w-full px-4 py-3 rounded-lg shadow-lg text-white z-50
					${getColorClass(alert.type)}`}
					role="alert"
				>
					<div className="mr-3">
						{Icon && <Icon fontSize="medium" />}
					</div>
					<div className="flex-grow font-medium">
						{alert.message}
					</div>
					<button
						onClick={clearAlert}
						className="ml-4 focus:outline-none hover:opacity-75 transition-opacity"
						aria-label="Fechar alerta"
					>
						<CloseIcon fontSize="small" />
					</button>
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

const getIcon = (type?: AlertType) => {
	switch (type) {
	case "success":
		return CheckCircleIcon;
	case "error":
		return ErrorIcon;
	case "warning":
		return WarningIcon;
	case "info":
	default:
		return InfoIcon;
	}
};

export { AlertContext };