import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useAuth } from "./contexts/AuthContext";
import { AuthLoading } from "./components/Loading/AuthLoading";

function App() {
	const { isCheckingAuth } = useAuth();

	if (isCheckingAuth) {
		return <AuthLoading />;
	}

	return (
		<Routes>
			<Route index path="/login" element={<Login />} />
			<Route element={<ProtectedRoute />}>
				<Route index element={<Home />} />
			</Route>
		</Routes>
	);
}

export default App;
