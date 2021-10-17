export const isTouchDevice = () => {
	if(window){

		return "ontouchstart" in window || navigator.maxTouchPoints > 0;
	}
	return false
};
