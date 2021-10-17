import * as React from "react";
import {FC, FormHTMLAttributes, useRef} from "react";
import {toast} from "react-toastify";
import {Button} from "@components/atoms/Button";
import styled from "styled-components";

const HiddenAscii = styled.p`
	position: absolute;

	font-size: 0px;
`;

interface CopyAsciiProps extends FormHTMLAttributes<HTMLFormElement> {
	ascii: string;
}

export const CopyAscii: FC<CopyAsciiProps> = ({ascii}) => {
	const asciiRef = useRef<HTMLParagraphElement | null>(null);

	const handleClick = () => {
		if (navigator.clipboard) {
			const clipboardPromise = navigator.clipboard.writeText(ascii);
			toast.promise(clipboardPromise, {
				pending: "Copying...",
				success: "Copied to the Clipboard",
				error: "An error ocurred while copying",
			});
		} else if (asciiRef.current && window) {
			//Before we copy, we are going to select the text.
			try {
				const selection = window.getSelection();
				const range = document.createRange();
				range.selectNodeContents(asciiRef.current);

				if (selection) {
					selection.removeAllRanges();
					selection.addRange(range);
					document.execCommand("copy");
					//add to clipboard.
					toast.success("Copied to the Clipboard");
				}
			} catch {
				toast.error("An error ocurred while copying");
			}
		}
	};

	return (
		<>
			<HiddenAscii ref={asciiRef}>{ascii}</HiddenAscii>
			<Button onClick={handleClick} type="button">
				Copy
			</Button>
		</>
	);
};
