import * as React from "react";
import {FC, ImgHTMLAttributes, Dispatch} from "react";
import styled from "styled-components";
import {breakpoint} from "@global/GlobalStyles";

const StyledUploadedImage = styled.img`
	flex-shrink: 0;

	border-radius: 6px;
	padding: 10px;
	margin: 0px;

	width: 100%;

	background-color: rgba(255, 255, 255, 0.075);
	cursor: pointer;

	@media screen and (max-width: ${breakpoint}) {
		width: auto;
		height: 100%;
	}
`;

interface UploadedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	liftImageSrc: Dispatch<React.SetStateAction<string | null>>;
	src: string;
}

export const UploadedImage: FC<UploadedImageProps> = ({src, liftImageSrc}) => {
	return (
		<StyledUploadedImage
			onClick={() => {
				liftImageSrc(src);
			}}
			src={src}></StyledUploadedImage>
	);
};
