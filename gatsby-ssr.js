import * as React from "react";
import {GlobalStyles} from "@global/GlobalStyles";

export const wrapPageElement = ({element}) => {
	return (
		<>
			<GlobalStyles />
			{element}
		</>
	);
};
