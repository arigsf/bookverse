import Clear from "@mui/icons-material/Clear";
import React, { useEffect, useState } from "react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = React.memo(
	({
		isOpen,
		onClose,
		title,
		children
	}) => {
		const [showModal, setShowModal] = useState(false);
		const [animateModal, setAnimateModal] = useState(false);

		useEffect(() => {
			if (isOpen) {
				setShowModal(true);
				setTimeout(() => setAnimateModal(true), 10);
			} else {
				setAnimateModal(false);
				setTimeout(() => setShowModal(false), 200);
			}
		}, [isOpen]);

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
							onClick={onClose}
							tabIndex={0}
							className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
							aria-label="Close modal"
						>
							<Clear />
						</button>
					</div>
					<div className="text-gray-700">{children}</div>
				</div>
			</div>
		);
	}
);