import * as React from "react";
import {FC, HTMLAttributes} from "react";
import {Helmet} from "react-helmet";

interface ShareHelmetProps extends HTMLAttributes<HTMLDivElement> {
	title: string;
	description: string;
	urlImage: string;
	url: string;
}

export const ShareHelmet: FC<ShareHelmetProps> = ({title, description, urlImage, url}) => {
	return (
		<Helmet>
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={urlImage} />
			<meta property="og:url" content={url} />

			<meta name="twitter:card" content="summary" />
			<meta name="twitter:creator" content="@CodeMonknow" />
			<meta property="twitter:title" content={title} />
			<meta property="twitter:description" content={description} />
			<meta property="twitter:image" content={urlImage} />
			<meta property="twitter:url" content={url} />
		</Helmet>
	);
};
