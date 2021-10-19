import * as React from "react";
import {FC, InputHTMLAttributes, Dispatch} from "react";
import {breakpoint, highlightColor, mainColor} from "@global/GlobalStyles";
import styled from "styled-components";

const sliderHeight = "clamp(10px, 5vw, 20px)";

const StyledSliderInput = styled.div`
	flex-shrink: 2;

	display: grid;
	grid-template-rows: 1fr 1fr;
	grid-template-columns: 1fr 50px;
	grid-template-areas:
		"label label"
		"input value";
	justify-content: center;
	align-items: center;
	gap: 10px;

	box-sizing: border-box;
	border-radius: 6px;
	padding: 20px;

	width: 100%;

	background-color: ${mainColor};

	@media screen and (max-width: ${breakpoint}) {
		width: max(250px, 40%);
		flex-grow: 2;
	}

	label {
		grid-area: label;
		width: 100%;

		text-align: center;
		font-size: clamp(12px, 2vw, 14px);
	}

	input[type="range"] {
		grid-area: input;

		outline: 0;
		border: 0;
		border-radius: 500px;
		width: 100%;
		margin: 10px 0 16px;
		transition: box-shadow 0.2s ease-in-out;

		&:not(:active) + .h4-container h4 {
			opacity: 0;
			margin-top: -50px;
			pointer-events: none;
		}

		// Chrome
		@media screen and (-webkit-min-device-pixel-ratio: 0) {
			& {
				overflow: hidden;
				height: ${sliderHeight};
				-webkit-appearance: none;
				background-color: ${mainColor};
			}
			&::-webkit-slider-runnable-track {
				height: ${sliderHeight};
				-webkit-appearance: none;
				color: #444;
				transition: box-shadow 0.2s ease-in-out;
			}
			&::-webkit-slider-thumb {
				width: 30px;
				-webkit-appearance: none;
				height: ${sliderHeight};
				cursor: ew-resize;
				background: ${mainColor};
				box-shadow: -340px 0 0 320px ${highlightColor}, inset 0 0 0 40px ${highlightColor};
				border-radius: 50%;
				transition: box-shadow 0.2s ease-in-out;
				position: relative;
			}
			&:active {
				outline: 1px solid ${highlightColor};
			}
		}
	}

	input[type="number"] {
		grid-area: value;

		border: none;
		border-radius: 6px;
		box-sizing: border-box;
		padding: 5px;

		height: 30px;

		background-color: ${mainColor};
		color: #fff;
	}
`;

interface SliderInputProps extends InputHTMLAttributes<HTMLInputElement> {
	value: number;
	max: number;
	min: number;
	label: string;
	liftState: Dispatch<React.SetStateAction<number>>;
}

export const SliderInput: FC<SliderInputProps> = ({value, liftState, name, label, min, max, step}) => {
	return (
		<StyledSliderInput>
			<label htmlFor={name}>{label}</label>
			<input
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={(event) => {
					liftState(parseFloat(event.target.value));
				}}
				name={name}
				id={name}
			/>
			<input
				min={min}
				max={max}
				type="number"
				value={value}
				onChange={(event) => {
					const value = parseFloat(event.target.value);
					const truncatedValue = Math.max(min, Math.min(value, max));

					liftState(truncatedValue);
				}}
			/>
		</StyledSliderInput>
	);
};
