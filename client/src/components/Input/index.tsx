import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface InputProps {
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
	realPlaceholder?: string;
	type?: string;

	onFocus?: () => void;
	onBlur?: () => void;

	className?: string;
	wrapperClassName?: string;
	labelClassName?: string;

	id?: string;
	required?: boolean;
	disabled?: boolean;
	error?: boolean;
	hideRevealPasswordButton?: boolean;
	minLength?: number;
	maxLength?: number;
}

export function Input(props: InputProps) {
	const {
		value,
		onChange,
		placeholder,
		realPlaceholder,
		type = "text",
		onFocus,
		onBlur,
		className = "",
		id,
		required = false,
		disabled = false,
		error = false,
		hideRevealPasswordButton = false,
		minLength = 0,
		maxLength = 255,
	} = props;

	const [isPasswordHidden, setIsPasswordHidden] = useState(true);
	const [isFocused, setIsFocused] = useState(false);

	const inputId = id || placeholder.toLowerCase().replace(/\s+/g, "-");
	const isPassword = type === "password";

	const handlePasswordToggle = () => setIsPasswordHidden((prev) => !prev);

	const handleFocus = () => {
		setIsFocused(true);
		if (onFocus) onFocus();
	};

	const handleBlur = () => {
		setIsFocused(false);
		if (onBlur) onBlur();
	};

	return (
		<div className={"relative"}>
			<input
				id={inputId}
				type={isPassword ? (isPasswordHidden ? "password" : "text") : type}
				value={value}
				required={required}
				onChange={(e) => onChange(e.target.value)}
				className={`peer h-12 w-full rounded-xl border bg-transparent p-2.5 transition-colors ${error ? "border-red-500" : "border-textLabel"} ${isPassword ? "pr-10" : ""} focus:border-text focus:outline-none ${disabled ? "cursor-not-allowed" : ""} ${className}`}
				placeholder={realPlaceholder && isFocused ? realPlaceholder : undefined}
				disabled={disabled}
				onFocus={handleFocus}
				onBlur={handleBlur}
				autoComplete={isPassword ? "current-password" : undefined}
				minLength={minLength}
				maxLength={maxLength}
			/>
			<label
				htmlFor={inputId}
				className={`peer-focus:text-text pointer-events-none absolute left-2.5 max-w-[80%] origin-left transform overflow-hidden text-ellipsis text-nowrap px-1 transition-[top,font-size,color] duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-1.5 peer-focus:text-xs ${value ? "-top-1.5 text-xs" : "top-3 text-base"} ${error ? "text-red-500" : ""}`}
			>
				{placeholder}
			</label>

			{isPassword && !hideRevealPasswordButton && (
				<button
					type="button"
					onClick={handlePasswordToggle}
					className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl pl-0.5 pr-0.5 text-gray-500 hover:text-gray-700 focus:border-blue-500"
					aria-label={isPasswordHidden ? "Mostrar" : "Ocultar"}
					tabIndex={-1}
				>
					{isPasswordHidden ? <Visibility /> : <VisibilityOff />}
				</button>
			)}
		</div>
	);
}