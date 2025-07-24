import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface InlineLoadingProps {
	size?: number;
	color?: string;
	className?: string;
}

export const InlineLoading: React.FC<InlineLoadingProps> = ({
	size = 24,
	color = "var(--primary)",
	className,
}) => {
	return (
		<span className={`flex items-center justify-center ${className ?? ""}`}>
			<CircularProgress style={{ color }} size={size} />
		</span>
	);
};