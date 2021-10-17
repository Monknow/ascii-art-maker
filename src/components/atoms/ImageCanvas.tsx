import * as React from "react";
import {FC, CanvasHTMLAttributes, Dispatch, useEffect, useState, useRef} from "react";
import styled from "styled-components";
import {convertToGreyScale} from "@functions/convertToGreyScale";
import {clampDimensions} from "@functions/clampDimensions";
import {ImageDimensionTypes} from "@interfaces/ImageDimensionTypes";

const StyledImageCanvas = styled.canvas`
	width: clamp(50px, 70vw, 600px);
	display: none;
`;

interface ImageCanvasProps extends CanvasHTMLAttributes<HTMLCanvasElement> {
	imageSrc: string;
	setGreyScales: Dispatch<React.SetStateAction<number[]>>;
	setImageDimensions: Dispatch<React.SetStateAction<ImageDimensionTypes>>;
	resolution: number;
	contrast: number;
	brightness: number;
	negative: boolean;
}

export const ImageCanvas: FC<ImageCanvasProps> = ({
	imageSrc,
	setGreyScales,
	setImageDimensions,
	resolution,
	negative,
	contrast,
	brightness,
}) => {
	const [imageData, setImageData] = useState<ImageData | null>(null);
	const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
	const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		setCanvas(canvasRef.current);
	}, [canvasRef]);

	useEffect(() => {
		if (canvas) {
			setContext(canvas.getContext("2d"));
		}
	}, [canvas]);

	useEffect(() => {
		if (canvas) {
			const image = new Image();

			image.onload = () => {
				const [width, height] = clampDimensions(image.width, image.height, resolution);

				canvas.width = width;
				canvas.height = height;

				if (context) {
					context.drawImage(image, 0, 0, width, height);
					setImageData(context.getImageData(0, 0, width, height));
				}
			};

			image.src = imageSrc;
		}
	}, [canvas, context, imageSrc, resolution]);

	useEffect(() => {
		if (imageData) {
			const {data, greyScales} = convertToGreyScale(imageData, negative, contrast, brightness);
			const {width, height} = imageData;
			setGreyScales(greyScales);
			setImageDimensions({width, height});

			if (context) {
				const newImageDataInGrey = new ImageData(data, width, height);
				context.putImageData(newImageDataInGrey, 0, 0, 0, 0, width, height);
			}
		}
	}, [imageData, context, negative, contrast, brightness]);

	return <StyledImageCanvas ref={canvasRef}></StyledImageCanvas>;
};
