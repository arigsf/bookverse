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
	loading: boolean;
	handleLogin: (email: string, password: string) => void;
	handleLogout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const navigate = useNavigate();
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	const fetchUser = async () => {
		try {
			const res = await myAccount();
			console.log(res);
			setUser(res.data);
		} catch (error) {
			setUser(null);
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	async function handleLogin(email: string, password: string) {
		try {
			await login({ email, password });
			await fetchUser();
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
		<AuthContext.Provider value={{ user, loading, handleLogin, handleLogout }}>
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
