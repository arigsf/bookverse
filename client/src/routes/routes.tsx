import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
	return (
		<Routes>
			<Route index element={
				<ProtectedRoute>
					<Home />
				</ProtectedRoute>
			} />
			<Route path="/login" element={<Login />} />
		</Routes>
	);
}