import { createContext, useState, useContext, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { login, logout, myAccount } from "../../api/user";

type User = {
	id: string;
	name: string;
	email: string;
	role: string;
	active: boolean;
};

type AuthContextType = {
	user: User | null;
	handleLogin: (email: string, password: string) => void;
	handleLogout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
	const navigate = useNavigate();
	const [user, setUser] = useState<User | null>(null);

	const fetchUser = async () => {
		try {
			const res = await myAccount();
			setUser(res.data);
		} catch (error) {
			setUser(null);
			console.log(error);
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	async function handleLogin(email: string, password: string) {
		try {
			const user = await login({ email, password });
			setUser(user);
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	}

	async function handleLogout() {
		try {
			await logout();
			setUser(null);
			navigate("/login");
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
			{children}
		</AuthContext.Provider>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth deve ser usado dentro de um AuthProvider");
	}
	return context;
}
