import * as React from "react";
import {FC} from "react";
import {App} from "@components/organisms/App";
import {ShareHelmet} from "@components/atoms/ShareHelmet";
import {PageProps} from "gatsby";
import banner from "@assets/images/banner.png";

const IndexPage: FC<PageProps> = ({location}) => {
	return (
		<main>
			<ShareHelmet
				title="Ascii Art Maker"
				description="Convert and transform images to ASCII characters art. The best ASCII Image converter"
				urlImage={banner}
				url={location.href}
			/>
			<App />
		</main>
	);
};

export default IndexPage;
