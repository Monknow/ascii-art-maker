import * as React from "react";
import {ChangeEventHandler, FC, InputHTMLAttributes} from "react";
import {mainColor, highlightColor} from "@global/GlobalStyles";
import styled from "styled-components";

const toggleIndicatorSize = 24; // changing this number will resize the whole toggle
const trackHeight = toggleIndicatorSize + 6;
const trackWidth = toggleIndicatorSize * 2.5;
const highContrastModeSupport = "solid 2px transparent";

const focusRing = `0px 0px 0px 2px ${mainColor}`;

const StyledCheckbox = styled.label`
	display: flex;
	align-items: center;

	align-items: center;
	border-radius: 100px;
	display: flex;
	font-weight: 700;
	margin-bottom: 16px;

	flex-basis: 150px;

	font-size: clamp(10px, 2vw, 14px);

	input {
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		height: 1px;
		overflow: hidden;
		position: absolute;
		white-space: nowrap;
		width: 1px;

		&:not([disabled]):active + .toggle-track,
		&:not([disabled]):focus + .toggle-track {
			border: 1px solid transparent;
			box-shadow: ${focusRing};
		}

		&:disabled + .toggle-track {
			cursor: not-allowed;
			opacity: 0.7;
		}

		&:checked + .toggle-track .toggle-indicator {
			background: ${highlightColor};
			transform: translateX(${trackWidth - trackHeight}px);
		}
	}
`;
const ToogleTrack = styled.span`
	background: ${mainColor};
	border: 1px solid ${highlightColor};
	border-radius: 100px;
	cursor: pointer;
	display: flex;
	height: ${trackHeight}px;
	margin-right: 12px;
	position: relative;
	width: ${trackWidth}px;

	@media screen and (-ms-high-contrast: active) {
		& {
			border-radius: 0;
		}
	}
`;

const ToogleIndicator = styled.span`
	align-items: center;
	background: ${mainColor};
	border-radius: ${toggleIndicatorSize}px;
	bottom: 3px;
	display: flex;
	height: ${toggleIndicatorSize}px;
	justify-content: center;
	left: 2px;
	outline: ${highContrastModeSupport};
	position: absolute;
	transition: 300ms;
	width: ${toggleIndicatorSize}px;
`;
interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
	onChange: ChangeEventHandler<HTMLInputElement>;
	label: string;
}

export const Checkbox: FC<CheckboxProps> = ({name, checked, onChange, label}) => {
	return (
		<StyledCheckbox htmlFor={name}>
			<input
				type="checkbox"
				name={name}
				id={name}
				checked={checked}
				onChange={(event) => {
					onChange(event);
				}}
			/>
			<ToogleTrack className="toggle-track">
				<ToogleIndicator className="toggle-indicator"></ToogleIndicator>
			</ToogleTrack>
			{label}
		</StyledCheckbox>
	);
};
