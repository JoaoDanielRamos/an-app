import { useState } from "react";

export default function useToggle() {
	const [isOpen, setIsOpen] = useState(false);

	return {
		isOpen,
		setIsOpen,
		toggle: () => setIsOpen((prev) => !prev),
	} as const;
}
