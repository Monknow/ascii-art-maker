export const isTouchDevice = () => {
	if (globalThis?.window) {
		return "ontouchstart" in window || navigator.maxTouchPoints > 0;
	}
	return false;
};
