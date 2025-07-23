import { lazy } from "react";
import { Navigate, type RouteObject } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));

const RouterObject = (logged: boolean): RouteObject[] => [
	{
		path: "/",
		element: logged ? <Home /> : <Navigate to="/login" />,
	},
	{
		path: "/login",
		element: logged ? <Navigate to="/" /> : <Login />,
	},
	{
		path: "*",
		element: <Navigate to={logged ? "/" : "/login"} />,
	},
];

export default RouterObject;
