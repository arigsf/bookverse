import React from "react";

interface InputContainerProps {
	children: React.ReactNode;
	errorMessage?: string | null;
	className?: string;
}

export const InputContainer: React.FC<InputContainerProps> = ({
	children,
	errorMessage,
	className = "",
}) => {
	return (
		<div className={`flex w-full flex-col ${className || ""}`}>
			{children}
			<div className="text-red-500 mt-1 text-sm">
				{errorMessage && <span>{errorMessage}</span>}
			</div>
		</div>
	);
};