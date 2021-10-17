import {greyRamp} from "@data/greyRamp";

export const getCharacterForGrayScale = (grayScale: number, opacity: number) => {
	const greyRampArray = Array.from(greyRamp);
	const greyRampWithOpacity =
		opacity >= 0
			? greyRampArray.slice(0, greyRampArray.length - opacity)
			: greyRampArray.slice((greyRampArray.length + opacity) * -1);

	return greyRampWithOpacity[Math.ceil(((greyRampWithOpacity.length - 1) * grayScale) / 255)];
};
