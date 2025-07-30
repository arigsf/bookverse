import Clear from "@mui/icons-material/Clear";
import React, { useEffect, useState } from "react";
import { Button } from "../Button";

interface ModalProps {
	isOpen: boolean;
	title: string;
	onConfirm?: () => void;
	onCancel: () => void;
	confirmText?: string;
	cancelText?: string;
	children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = React.memo(
	({
		isOpen,
		title,
		onConfirm,
		onCancel,
		confirmText = "Confirmar",
		cancelText = "Fechar",
		children
	}) => {
		const [showModal, setShowModal] = useState(false);
		const [animateModal, setAnimateModal] = useState(false);

		useEffect(() => {
			if (isOpen) {
				setShowModal(true);
				setTimeout(() => setAnimateModal(true), 10);
			}
		}, [isOpen]);

		const handleClose = () => {
			setAnimateModal(false);
			setTimeout(() => setShowModal(false), 200);
			onCancel();
		};

		if (!showModal) return null;

		return (
			<div
				className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ease-in-out ${animateModal ? "bg-black bg-opacity-80" : "bg-black bg-opacity-0"}`}
			>
				<div
					className={`bg-white w-full max-w-lg rounded-lg border border-gray-300 p-6 shadow-lg transition-all duration-200 ease-in-out md:p-8 ${animateModal ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
				>
					<div className="mb-8 flex items-center justify-between">
						<h2 className="text-gray-900 text-xl font-bold md:text-2xl">
							{title}
						</h2>
						<button
							onClick={handleClose}
							tabIndex={0}
							className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
						>
							<Clear />
						</button>
					</div>
					<div className="text-gray-700">{children}</div>
					<div className="flex justify-end mt-8 space-x-3">
						<Button className="max-w-40 bg-gray-600 hover:bg-gray-500"
							onClick={handleClose}>
							{cancelText}
						</Button>
						{onConfirm && (
							<Button className="max-w-40 bg-red-600 hover:bg-red-500"
								onClick={onConfirm}>
								{confirmText}
							</Button>
						)}
					</div>
				</div>
			</div>
		);
	}
);