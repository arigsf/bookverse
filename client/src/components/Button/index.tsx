import React from "react";
import { InlineLoading } from "../Loading/InlineLoading";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  form?: string;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outlined";
}

export const Button: React.FC<ButtonProps> = React.memo(
	({
		type = "button",
		onClick,
		form,
		disabled = false,
		loading = false,
		children,
		className = "",
		variant = "default",
	}) => {
		const baseStyles = "flex justify-center items-center gap-2 w-full h-12 cursor-pointer rounded-md p-2 font-medium text-lg transition-colors";
		const variants = {
			default: "text-white bg-blue-600 hover:bg-blue-500",
			outlined: "text-blue-600 border border-blue-600 bg-white hover:bg-blue-50",
		};

		return (
			<button
				type={type}
				onClick={onClick}
				form={form}
				disabled={disabled}
				className={`${baseStyles} ${variants[variant]} ${className}`}
			>
				{!loading ? (
					children
				) : (
					<InlineLoading
						color={variant === "default" ? "var(--backgroundPrimary)" : ""}
					/>
				)}
			</button>
		);
	}
);