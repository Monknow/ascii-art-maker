import * as React from "react";
import {FC, InputHTMLAttributes, ChangeEventHandler} from "react";
import {breakpoint, highlightColor, mainColor} from "@global/GlobalStyles";
import styled from "styled-components";

const sliderHeight = "clamp(10px, 5vw, 20px)";

const StyledSliderInput = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column nowrap;

	box-sizing: border-box;
	border-radius: 6px;
	padding: clamp(5px, 3vw, 10px);

	width: 100%;

	background-color: ${mainColor};

	@media screen and (max-width: ${breakpoint}) {
		width: max(140px, 40%);
		flex-grow: 2;
	}

	input[type="range"] {
		outline: 0;
		border: 0;
		border-radius: 500px;
		width: 400px;
		max-width: 100%;
		margin: 10px 0 16px;
		transition: box-shadow 0.2s ease-in-out;

		&:not(:active) + .h4-container h4 {
	opacity: 0;
	margin-top: -50px;
	pointer-events: none;
}


		// Chrome
		@media screen and (-webkit-min-device-pixel-ratio:0) {
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
			&:active  {
				outline: 1px solid ${highlightColor};
			}
		}
		// Firefox
		&::-moz-range-progress {
			background-color: ${highlightColor}; 
		}

		// IE
		&::-ms-fill-lower {
			background-color:${highlightColor}; 
		}

	}
}
.h4-container {
	width: 400px;
	max-width: 100%;
	padding: 0 20px;
	box-sizing: border-box;
	position: relative;
	.h4-subcontainer {
		width: 100%;
		position: relative;
		h4 {
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			top: 0;
			width: 40px;
			height: 40px;
			color: #fff;
			font-size: 12px;
			transform-origin: center -10px;
			transform: translateX(-50%);
			transition: margin-top 0.15s ease-in-out,
				opacity 0.15s ease-in-out;
			span {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				background-color: ${highlightColor};
				border-radius: 0 50% 50% 50%;
				transform: rotate(45deg);
				z-index: -1;
			}
		}
	}


`;

interface SliderInputProps extends InputHTMLAttributes<HTMLInputElement> {
	value: number;
	max: number;
	label: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
}

export const SliderInput: FC<SliderInputProps> = ({value, onChange, name, label, min, max, step}) => {
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
					onChange(event);
				}}
				name={name}
				id={name}
			/>
			<div className="h4-container">
				<div className="h4-subcontainer">
					<h4>
						{value}
						<span></span>
					</h4>
				</div>
			</div>
		</StyledSliderInput>
	);
};
