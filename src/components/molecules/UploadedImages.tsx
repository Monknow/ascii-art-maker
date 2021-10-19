import * as React from "react";
import {FC, Dispatch, useEffect} from "react";
import {UploadedImage} from "@components/atoms/UploadedImage";
import styled from "styled-components";
import {InputFile} from "@components/atoms/InputFile";
import {breakpoint} from "@global/GlobalStyles";

const StyledUploadedImages = styled.div`
	grid-area: images;

	width: 100%;
	height: 100%;

	transform: translateZ(0);
`;

const Gallery = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-flow: column nowrap;
	gap: clamp(10px, 8vw, 20px);

	overflow: hidden auto;

	box-sizing: border-box;
	padding: 20px;

	width: 100%;
	height: 100%;

	margin-top: 60px;

	@media screen and (max-width: ${breakpoint}) {
		overflow: auto hidden;

		height: 120px;
		flex-flow: row nowrap;
	}
`;

interface UploadedImagesProps {
	liftUploadedImages: Dispatch<React.SetStateAction<string[]>>;
	liftImageSrc: Dispatch<React.SetStateAction<string | null>>;
	uploadedImages: string[];
	imageSrc: string | null;
}

export const UploadedImages: FC<UploadedImagesProps> = ({
	liftUploadedImages,
	uploadedImages,
	liftImageSrc,
	imageSrc,
}) => {
	useEffect(() => {
		if (imageSrc && !uploadedImages.includes(imageSrc)) {
			liftUploadedImages(uploadedImages.concat(imageSrc));
		}
	}, [imageSrc]);

	return (
		<StyledUploadedImages>
			<InputFile liftImageSrc={liftImageSrc} uploadedImages={uploadedImages} />
			<Gallery>
				{uploadedImages.map((src) => {
					return <UploadedImage liftImageSrc={liftImageSrc} key={src} src={src}></UploadedImage>;
				})}
			</Gallery>
		</StyledUploadedImages>
	);
};
