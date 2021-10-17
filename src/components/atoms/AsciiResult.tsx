import * as React from "react";
import {FC, HTMLAttributes, Dispatch, useState, useEffect, useRef} from "react";
import {getCharacterForGrayScale} from "@functions/getCharacterForGrayScale";
import {ImageDimensionTypes} from "@interfaces/ImageDimensionTypes";
import styled from "styled-components";
import {breakpoint, mainColor} from "@global/GlobalStyles";
import {isTouchDevice} from "@functions/isTouchDevice";

interface StyledAsciiResultProps extends HTMLAttributes<HTMLPreElement> {
	imageDimensions: ImageDimensionTypes;
	asciiIsDark: boolean;
	dragging: boolean;
	zoom: number;
}

const StyledAsciiResult = styled.pre<StyledAsciiResultProps>`
	grid-area: result;
	place-self: center;

	border-radius: 6px;

	width: 100%;
	height: 100%;

	line-height: 1;
	font-size: ${({zoom}) => zoom}px;

	overflow: ${isTouchDevice() ? "scroll" : "hidden"};

	font-family: monospace;
	cursor: ${({dragging}) => (dragging ? "grabbing" : "move")};
	user-select: ${({dragging}) => (dragging ? "none" : "auto")};

	background-color: ${({asciiIsDark}) => (asciiIsDark ? mainColor : "#fff")};
	color: ${({asciiIsDark}) => (asciiIsDark ? "#fff" : "#000")};

	@media screen and (max-width: ${breakpoint}) {
		height: clamp(400px, 70vw, 800px);
	}
`;

interface AsciiResultProps extends HTMLAttributes<HTMLPreElement> {
	greyScales: number[];
	asciiIsDark: boolean;
	imageDimensions: ImageDimensionTypes;
	liftAscii: Dispatch<React.SetStateAction<string>>;
	liftZoom: Dispatch<React.SetStateAction<number>>;
	opacity: number;
	zoom: number;
}

export const AsciiResult: FC<AsciiResultProps> = ({
	greyScales,
	imageDimensions,
	liftAscii,
	liftZoom,
	zoom,
	opacity,
	asciiIsDark,
}) => {
	const [ascii, setAscii] = useState("");
	const [position, setPosition] = useState({top: 0, left: 0, x: 0, y: 0});
	const [dragging, setDragging] = useState(false);

	const asciiRef = useRef<HTMLPreElement | null>(null);

	useEffect(() => {
		const newAscii = greyScales.reduce((asciiImage, grayScale, index) => {
			let nextChars = getCharacterForGrayScale(grayScale, opacity);

			if ((index + 1) % imageDimensions.width === 0) {
				nextChars += "\n";
			}

			return asciiImage + nextChars;
		}, "");

		setAscii(newAscii);
	}, [greyScales, imageDimensions, opacity]);

	useEffect(() => {
		liftAscii(ascii);
	}, [ascii]);

	const mouseDownHandler = (event: React.MouseEvent<HTMLPreElement, globalThis.MouseEvent>) => {
		if (asciiRef.current && ascii) {
			setDragging(true);

			setPosition({
				left: asciiRef.current.scrollLeft,
				top: asciiRef.current.scrollTop,
				x: event.clientX,
				y: event.clientY,
			});
		}
	};

	const mouseMoveHandler = (event: React.MouseEvent<HTMLPreElement, globalThis.MouseEvent>) => {
		if (asciiRef.current && dragging && ascii) {
			// How far the mouse has been moved
			const dx = event.clientX - position.x;
			const dy = event.clientY - position.y;

			// Scroll the element
			asciiRef.current.scroll({top: position.top - dy, left: position.left - dx});
		}
	};

	const mouseUpHandler = () => {
		setDragging(false);
	};

	const mouseWheelHandler = (event: React.WheelEvent<HTMLPreElement>) => {
		if (ascii) {
			if (event.deltaY > 0 && zoom < 50) {
				liftZoom((zoom) => zoom + 2);
			}
			if (event.deltaY < 0 && zoom > 2) {
				liftZoom((zoom) => zoom - 2);
			}
		}
	};

	return (
		<StyledAsciiResult
			ref={asciiRef}
			dragging={dragging}
			asciiIsDark={asciiIsDark}
			zoom={zoom}
			onMouseDown={(event) => {
				mouseDownHandler(event);
			}}
			onMouseMove={(event) => {
				mouseMoveHandler(event);
			}}
			onMouseUp={mouseUpHandler}
			onMouseLeave={mouseUpHandler}
			onWheel={(event) => {
				mouseWheelHandler(event);
			}}
			imageDimensions={imageDimensions}>
			{ascii}
		</StyledAsciiResult>
	);
};
