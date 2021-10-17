import * as React from "react";
import {FC} from "react";
import {App} from "@components/organisms/App";
import {ShareHelmet} from "@components/atoms/ShareHelmet";
import {PageProps} from "gatsby";
import banner from "@assets/images/banner.png";
import {Helmet} from "react-helmet";

const IndexPage: FC<PageProps> = ({location}) => {
	return (
		<main>
			<Helmet>
				<title>Ascii Art Maker</title>
			</Helmet>
			<ShareHelmet
				title="Ascii Art Maker"
				description="Convert and transform images to ASCII characters art. The best ASCII Image converter"
				urlImage={`${location.origin}/${banner}`}
				url={location.href}
			/>
			<App />
		</main>
	);
};

export default IndexPage;
