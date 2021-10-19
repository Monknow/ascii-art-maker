import {ChangeEvent, Dispatch} from "react";

export const sliderOnChange = (
	event: ChangeEvent<HTMLInputElement>,
	liftState: Dispatch<React.SetStateAction<number>>,
	min: number
) => {
	const value = parseInt(event.target.value);
	const truncatedValue = value < min ? value : min;

	liftState(truncatedValue);
};
