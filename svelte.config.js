const sveltePreprocess = require('svelte-preprocess');

module.exports = {
	preprocess: sveltePreprocess({
		scss: {
			sass: require('sass'),
			includePaths: ["./src/scss"],
		}
	}),
};