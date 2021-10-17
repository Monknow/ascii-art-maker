import {truncateColor} from "./truncateColor";

export const applyBrightness = (color: number, brightness: number) => {
	const colorWithBrightness = truncateColor(color + 255 * (brightness / 100));

	return colorWithBrightness;
};
