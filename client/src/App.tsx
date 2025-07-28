import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/Route/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useAuth } from "./contexts/AuthContext";
import { AuthLoading } from "./components/Loading/AuthLoading";
import Settings from "./pages/Settings";
import { PublicRoute } from "./components/Route/PublicRoute";
import NotFound from "./pages/NotFound";

function App() {
	const { isCheckingAuth } = useAuth();

	if (isCheckingAuth) {
		return <AuthLoading />;
	}

	return (
		<Routes>
			<Route element={<PublicRoute />}>
				<Route path="/login" element={<Login />} />
			</Route>
			<Route element={<ProtectedRoute />}>
				<Route path="/" element={<Home />} />
				<Route path="/settings" element={<Settings />} />
			</Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default App;
