import {getCharacterForGrayScale} from "./getCharacterForGrayScale";

export const drawAscii = (grayScales: number[], width: number) => {
	const ascii = grayScales.reduce((asciiImage, grayScale, index) => {
		let nextChars = getCharacterForGrayScale(grayScale);

		if ((index + 1) % width === 0) {
			nextChars += "\n";
		}

		return asciiImage + nextChars;
	}, "");

	return ascii;
};
