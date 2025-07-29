import { createContext, useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { login, logout, myAccount } from "../../api/user";

type User = {
	id: string;
	name: string;
	email: string;
	role: string;
};

interface AuthContextType {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	isAuthenticated: boolean;
	isCheckingAuth: boolean;
	handleLogin: (email: string, password: string) => void;
	handleLogout: () => Promise<void>;
};

interface AuthProviderType {
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
				}
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (error) {
				setUser(null);
				setIsAuthenticated(false);
			} finally {
				setIsCheckingAuth(false);
			}
		};

		checkLoginStatus();
	}, []);

	async function handleLogin(email: string, password: string) {
		await login({ email, password });
		const user = await myAccount();
		setUser(user);
		setIsAuthenticated(true);
		navigate("/");
	}

	async function handleLogout() {
		await logout();
		setUser(null);
		setIsAuthenticated(false);
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


export { AuthContext };