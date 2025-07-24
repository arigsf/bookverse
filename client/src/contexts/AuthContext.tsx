import { createContext, useState, useContext, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { login, logout, myAccount } from "../../api/user";

type User = {
	id: string;
	name: string;
	email: string;
	role: string;
};

type AuthContextType = {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	isAuthenticated: boolean;
	isCheckingAuth: boolean;
	handleLogin: (email: string, password: string) => void;
	handleLogout: () => Promise<void>;
};

type AuthProviderType = {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderType> = ({ children }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState<User | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

	useEffect(() => {
		const checkLoginStatus = async () => {
			try {
				setIsCheckingAuth(true);
				const userData = await myAccount();

				if (userData) {
					setUser(userData);
					setIsAuthenticated(true);

					navigate("/");
				}
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (error) {
				console.log("deu ruim");
				setUser(null);
				setIsAuthenticated(false);
			} finally {
				setIsCheckingAuth(false);
			}
		};

		checkLoginStatus();
	}, [navigate]);

	async function handleLogin(email: string, password: string) {
		await login({ email, password });
		const user = await myAccount();
		setUser(user);
		navigate("/");
	}

	async function handleLogout() {
		await logout();
		setUser(null);
		navigate("/login");
	}

	return (
		<AuthContext.Provider value={{
			user,
			setUser,
			isAuthenticated,
			isCheckingAuth,
			handleLogin,
			handleLogout,
		}}>
			{children}
		</AuthContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth deve ser usado dentro de um AuthProvider");
	}
	return context;
}
