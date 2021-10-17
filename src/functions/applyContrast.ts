import {truncateColor} from "./truncateColor";

export const applyContrast = (color: number, contrast: number) => {
	const decimalContrast = contrast / 100 + 1; //convert to decimal & shift range: [0..2]
	const intercept = 128 * (1 - decimalContrast);

	const colorWithContrast = truncateColor(color * decimalContrast + intercept);

	return colorWithContrast;
};
