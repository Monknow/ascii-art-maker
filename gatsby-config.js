const path = require("path");

module.exports = {
	siteMetadata: {
		siteUrl: "https://www.yourdomain.tld",
		title: "ASCII Art Maker",
	},
	plugins: [
		"gatsby-plugin-styled-components",
		"gatsby-plugin-react-helmet",
		{
			resolve: `gatsby-plugin-alias-imports`,
			options: {
				alias: {
					"@assets": path.resolve(__dirname, "src/assets"),
					"@components": path.resolve(__dirname, "src/components"),
					"@interfaces": path.resolve(__dirname, "src/interfaces"),
					"@data": path.resolve(__dirname, "src/data"),
					"@functions": path.resolve(__dirname, "src/functions"),
					"@global": path.resolve(__dirname, "src/global"),
					"@pages": path.resolve(__dirname, "src/pages"),
				},
				extensions: [],
			},
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Ascci Art Maker`,
				short_name: `Ascii Art`,
				icon: `./src/assets/images/logo.png`,
				start_url: `/`,
				background_color: `#242424`,
				theme_color: `#0055c6`,
				display: `standalone`,
			},
		},
	],
};
