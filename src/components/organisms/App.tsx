import * as React from "react";
import {FC, useState} from "react";
import styled from "styled-components";
import {ImageCanvas} from "@components/atoms/ImageCanvas";
import {AsciiResult} from "@components/atoms/AsciiResult";
import {ImageDimensionTypes} from "@interfaces/ImageDimensionTypes";
import {Options} from "@components/molecules/Options";
import {UploadedImages} from "@components/molecules/UploadedImages";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {backgroundColor, breakpoint} from "@global/GlobalStyles";

const StyledApp = styled.div`
	overflow: hidden auto;

	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-flow: column nowrap;
	gap: clamp(10px, 9vw, 20px);

	min-height: 100vh;

	box-sizing: border-box;
	padding: clamp(10px, 8vw, 30px);

	color: #fff;
	background-color: ${backgroundColor};

	@media screen and (min-width: ${breakpoint}) {
		overflow: hidden;

		width: 100vw;
		height: 100vh;

		display: grid;
		grid-template-columns: 20vw auto 30vw;
		grid-template-rows: 100%;
		grid-template-areas: "images result options";
		justify-content: stretch;
	}

	& > * {
		flex-shrink: 0;
	}
`;

export const App: FC = () => {
	const [imageSrc, setImageSrc] = useState<string | null>(null);
	const [resolution, setResolution] = useState(50);
	const [opacity, setOpacity] = useState(0);
	const [contrast, setContrast] = useState(0);
	const [brightness, setBrightness] = useState(0);
	const [negative, setNegative] = useState(false);
	const [zoom, setZoom] = useState(12);
	const [greyScales, setGreyScales] = useState<number[]>([]);
	const [imageDimensions, setImageDimensions] = useState<ImageDimensionTypes>({width: 0, height: 0});
	const [ascii, setAscii] = useState("");
	const [uploadedImages, setUploadedImages] = useState<string[]>([]);
	const [asciiIsDark, setAsciiIsDark] = useState(true);

	return (
		<StyledApp>
			<UploadedImages
				liftUploadedImages={setUploadedImages}
				uploadedImages={uploadedImages}
				liftImageSrc={setImageSrc}
				imageSrc={imageSrc}
			/>
			<AsciiResult
				zoom={zoom}
				liftZoom={setZoom}
				asciiIsDark={asciiIsDark}
				greyScales={greyScales}
				imageDimensions={imageDimensions}
				opacity={opacity}
				liftAscii={setAscii}></AsciiResult>
			<Options
				liftAsciiIsDark={setAsciiIsDark}
				liftNegative={setNegative}
				liftResolution={setResolution}
				liftOpacity={setOpacity}
				liftContrast={setContrast}
				liftBrightness={setBrightness}
				liftZoom={setZoom}
				asciiIsDark={asciiIsDark}
				zoom={zoom}
				opacity={opacity}
				contrast={contrast}
				resolution={resolution}
				negative={negative}
				brightness={brightness}
				ascii={ascii}></Options>

			{imageSrc && (
				<ImageCanvas
					imageSrc={imageSrc}
					setGreyScales={setGreyScales}
					setImageDimensions={setImageDimensions}
					resolution={resolution}
					brightness={brightness}
					contrast={contrast}
					negative={negative}
				/>
			)}

			<ToastContainer theme="dark" limit={5} position="bottom-right" />
		</StyledApp>
	);
};
