export const truncateColor = (value: number) => {
	if (value < 0) {
		value = 0;
	} else if (value > 255) {
		value = 255;
	}

	return value;
};
