const { i18n } = require("./next-i18next.config");
const path = require('path');

module.exports = {
	i18n,
    webpack(config) {
	config.module.rules.push({
	  test: /\.svg$/,
	  use: ["@svgr/webpack"]
	});

	return config;
	},
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
	styleResources : {
		scss: []
	}
};
