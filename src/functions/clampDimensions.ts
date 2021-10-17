import {getFontRatio} from "./getFontRatio";

const toPositive = (value: number) => Math.max(1, Math.floor(value));

export const clampDimensions = (width: number | undefined, height: number | undefined, resolution: number) => {
	const maxWidth = resolution * 10;
	const maxHeight = resolution * 8;

	const positiveWidth = toPositive(width ?? maxWidth);
	const positiveHeight = toPositive(height ?? maxHeight);

	const rectifiedWidth = Math.floor(getFontRatio() * positiveWidth);

	if (positiveHeight > maxHeight) {
		const reducedWidth = Math.floor((rectifiedWidth * maxHeight) / positiveHeight);
		return [reducedWidth, maxHeight];
	}

	if (positiveWidth > maxWidth) {
		const reducedHeight = Math.floor((positiveHeight * maxWidth) / rectifiedWidth);
		return [maxWidth, reducedHeight];
	}

	return [rectifiedWidth, positiveHeight];
};
