import React from "react";

interface MainContainerProps {
	children: React.ReactNode;
	className?: string;
}

export const MainContainer: React.FC<MainContainerProps> = ({
	children,
	className = "",
}) => {
	return (
		<main className={`p-5 sm:ml-48 ${className || ""}`}>
			{children}
		</main>
	);
};