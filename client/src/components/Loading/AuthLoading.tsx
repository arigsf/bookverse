import CircularProgress from "@mui/material/CircularProgress";
import logo from "../../assets/logo.png";

export const AuthLoading = () => {
	return (
		<div className="fixed inset-0 flex flex-col items-center justify-center gap-6">
			<img
				src={logo}
				alt="Logo"
				className="w-1/6 h-auto"
			/>
			<CircularProgress color="primary" size={50} />
		</div>
	);
};
