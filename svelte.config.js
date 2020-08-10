const sveltePreprocess = require('svelte-preprocess');
const pathTo = require('./paths.config.js');

module.exports = {
	preprocess: sveltePreprocess({
		scss: {
			includePaths: [pathTo("scss")],
		}
	}),
};