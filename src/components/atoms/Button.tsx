import * as React from "react";
import {FC, ButtonHTMLAttributes} from "react";
import styled from "styled-components";
import {activeHighlightColor, activeMainColor, highlightColor, mainColor} from "@global/GlobalStyles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	secondary?: boolean | undefined;
}

const StyledButton = styled.button<ButtonProps>`
	border-radius: 6px;
	border: none;
	padding: clamp(5px, 3vw, 10px) clamp(20px, 15vw, 25px);

	font-family: "Open Sans Semibold";

	background-color: ${({secondary}) => (secondary ? mainColor : highlightColor)};
	color: #fff;

	cursor: pointer;

	transition: background-color 100ms ease-in-out;

	&:hover {
		background-color: ${({secondary}) => (secondary ? activeMainColor : activeHighlightColor)};
	}
`;

export const Button: FC<ButtonProps> = (props) => {
	return <StyledButton {...props}></StyledButton>;
};
