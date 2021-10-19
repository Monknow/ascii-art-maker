import * as React from "react";
import {useEffect, FC, FormHTMLAttributes, Dispatch} from "react";
import {CopyAscii} from "@components/atoms/CopyAscii";
import styled from "styled-components";
import {Button} from "@components/atoms/Button";
import {SliderInput} from "@components/atoms/SliderInput";
import {Checkbox} from "@components/atoms/Checkbox";

const StyledOptions = styled.form`
	grid-area: options;

	display: flex;
	align-items: center;
	align-content: space-between;
	flex-flow: row wrap-reverse;
	gap: 5px;

	width: 100%;
	height: 100%;
`;

const InputGroup = styled.div`
	display: flex;
	justify-content: space-between;
	flex-flow: row wrap;

	width: 100%;
`;

interface InitialValuesTypes {
	opacity: number;
	resolution: number;
	contrast: number;
	negative: boolean;
	zoom: number;
	brightness: number;
	asciiIsDark: boolean;
}

interface OptionsProps extends FormHTMLAttributes<HTMLFormElement>, InitialValuesTypes {
	liftAsciiIsDark: Dispatch<React.SetStateAction<boolean>>;
	liftResolution: Dispatch<React.SetStateAction<number>>;
	liftOpacity: Dispatch<React.SetStateAction<number>>;
	liftNegative: Dispatch<React.SetStateAction<boolean>>;
	liftZoom: Dispatch<React.SetStateAction<number>>;
	liftContrast: Dispatch<React.SetStateAction<number>>;
	liftBrightness: Dispatch<React.SetStateAction<number>>;
	ascii: string;
}

let initialValues: InitialValuesTypes;

export const Options: FC<OptionsProps> = ({
	liftAsciiIsDark,
	liftResolution,
	liftOpacity,
	liftNegative,
	liftContrast,
	liftBrightness,
	liftZoom,
	ascii,
	asciiIsDark,
	opacity,
	zoom,
	resolution,
	contrast,
	negative,
	brightness,
}) => {
	useEffect(() => {
		initialValues = {
			zoom,
			opacity,
			asciiIsDark,
			resolution,
			negative,
			contrast,
			brightness,
		};
	}, []);

	return (
		<StyledOptions>
			<InputGroup>
				<CopyAscii ascii={ascii} />
				<Button
					secondary
					type="reset"
					onClick={() => {
						liftBrightness(initialValues.brightness);
						liftContrast(initialValues.contrast);
						liftNegative(initialValues.negative);
						liftOpacity(initialValues.opacity);
						liftResolution(initialValues.resolution);
						liftAsciiIsDark(initialValues.asciiIsDark);
					}}>
					Reset
				</Button>
			</InputGroup>
			<SliderInput
				min={1}
				max={100}
				step={1}
				value={resolution}
				liftState={liftResolution}
				name="resolution"
				label="Resolution (Width)"
			/>
			<SliderInput
				min={-65}
				max={65}
				step={1}
				value={opacity}
				liftState={liftOpacity}
				name="opacity"
				label="Opacity"
			/>

			<SliderInput
				min={-100}
				max={100}
				step={1}
				value={contrast}
				liftState={liftContrast}
				name="contrast"
				label="Contrast"
			/>

			<SliderInput
				min={-100}
				max={100}
				step={1}
				value={brightness}
				liftState={liftBrightness}
				name="brightness"
				label="Brightness"
			/>
			<SliderInput min={2} max={50} step={1} value={zoom} liftState={liftZoom} name="zoom" label="Zoom" />

			<InputGroup>
				<Checkbox
					name="negative"
					checked={negative}
					label="Negative"
					onChange={() => {
						liftNegative(!negative);
					}}
				/>
				<Checkbox
					name="asciiIsDark"
					checked={asciiIsDark}
					label="Dark Mode"
					onChange={() => {
						liftAsciiIsDark(!asciiIsDark);
					}}
				/>
			</InputGroup>
		</StyledOptions>
	);
};
