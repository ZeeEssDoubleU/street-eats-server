const withPlugins = require("next-compose-plugins");

const nextConfig = {
	experimental: {
		async redirects() {
			return [
				// TODO: will remove this once homepage has been created
				{ source: "/", destination: "/restaurants", permanent: true }, // a permanent redirect
			];
		},
	},
};

module.exports = withPlugins(
	[
		// add plugins here..
	],
	nextConfig,
);
