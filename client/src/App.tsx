import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useAuth } from "./contexts/AuthContext";
import { AuthLoading } from "./components/Loading/AuthLoading";
import Settings from "./pages/Settings";

function App() {
	const { isCheckingAuth } = useAuth();

	if (isCheckingAuth) {
		return <AuthLoading />;
	}

	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route element={<ProtectedRoute />}>
				<Route path="/" element={<Home />} />
				<Route path="/settings" element={<Settings />} />
			</Route>
		</Routes>
	);
}

export default App;
