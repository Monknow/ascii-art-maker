import * as React from "react";
import {FC, InputHTMLAttributes, Dispatch, useState, useEffect, useRef} from "react";
import styled from "styled-components";
import {toast} from "react-toastify";
import {Button} from "./Button";

const StyledInputFile = styled.div`
	position: fixed;

	display: flex;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: 50px;

	background-color: rgb(36, 36, 36);

	input {
		display: none;
	}
`;

interface InputFileProps extends InputHTMLAttributes<HTMLInputElement> {
	liftImageSrc: Dispatch<React.SetStateAction<string | null>>;
	uploadedImages: string[];
}

const reader = globalThis?.window ? new FileReader() : null;

export const InputFile: FC<InputFileProps> = ({liftImageSrc, uploadedImages}) => {
	const [imageFile, setImageFile] = useState<File | null>(null);

	const inputFileRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		let mounted = true;

		if (mounted && imageFile && reader) {
			reader.onload = (data) => {
				if (typeof data?.target?.result === "string") {
					if (!uploadedImages.includes(data.target.result)) {
						liftImageSrc(data.target.result);
					} else {
						toast.info("The image has been already uploaded");
					}
				}
			};
			reader.readAsDataURL(imageFile);
		}
		return () => {
			mounted = false;
		};
	}, [imageFile]);

	return (
		<StyledInputFile>
			<input
				ref={inputFileRef}
				type="file"
				accept="image/*"
				onChange={(event) => {
					if (event.target.files) {
						const [file] = Array.from(event.target.files);

						if (file.type.startsWith("image/") && file.type !== "image/svg+xml") {
							setImageFile(file);
						} else {
							toast.error("File must be an image");
						}
					}
				}}
			/>
			<Button
				onClick={() => {
					if (inputFileRef.current) inputFileRef.current.click();
				}}>
				Upload Image
			</Button>
		</StyledInputFile>
	);
};
