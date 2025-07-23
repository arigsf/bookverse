import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./routes/ProtectedRoutes";

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<ProtectedRoutes />
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
