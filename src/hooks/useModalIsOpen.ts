import { useState } from "react";

const useModalIsOpen = () => {
	const [isOpen, setIsOpen] = useState(false);

	return { isOpen, setIsOpen };
};

export default useModalIsOpen;
