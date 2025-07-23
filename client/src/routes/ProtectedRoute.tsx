import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProtectedRoute({ children }: { children : any }) {
	const { user } = useAuth();

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return children;
}
