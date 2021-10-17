import {toGreyScale} from "@functions/toGreyScale";
import {applyContrast} from "./applyContrast";
import {applyBrightness} from "./applyBrightness";

export const convertToGreyScale = (imageData: ImageData, negative: boolean, contrast: number, brightness: number) => {
	let greyScale: number;
	const greyScales: number[] = [];

	const data = imageData.data.map((imagePixel: number, index: number, imagePixels: Uint8ClampedArray) => {
		if (index === 0 || index % 4 === 0) {
			let r: number;
			let g: number;
			let b: number;

			if (negative) {
				r = 255 - imagePixels[index];
				g = 255 - imagePixels[index + 1];
				b = 255 - imagePixels[index + 2];
			} else {
				r = imagePixels[index];
				g = imagePixels[index + 1];
				b = imagePixels[index + 2];
			}

			r = applyContrast(r, contrast);
			g = applyContrast(g, contrast);
			b = applyContrast(b, contrast);

			r = applyBrightness(r, brightness);
			g = applyBrightness(g, brightness);
			b = applyBrightness(b, brightness);

			greyScale = toGreyScale(r, g, b);
			greyScales.push(greyScale);
		}
		if ((index + 1) % 4 === 0) {
			return imagePixel;
		}
		return greyScale;
	});

	return {data, greyScales};
};
