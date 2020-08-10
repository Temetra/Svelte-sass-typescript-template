import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';

const production = !process.env.ROLLUP_WATCH;

import alias from "@rollup/plugin-alias";
import babel from "@rollup/plugin-babel";
import scss from "rollup-plugin-scss";
import webWorkerLoader from "rollup-plugin-web-worker-loader";
const pathTo = require('./paths.config.js');

function serve() {
	let server;
	
	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		/*
		"alias" rewrites import statements before the file is resolved
		Three specific shortcuts are replaced anywhere in the import path
			~/scss/ ~/stores/ ~/modules/
		This works for web-worker imports
			import TestWorker from "web-worker:~/modules/test.worker";
		The last is a components shortcut which changes imports that start with ~/
			import Header from "~/Header.svelte";
		*/
		alias({
			resolve: [".svelte", ".ts", ".js"],
			entries: [
				{ find: /~\/scss\//, replacement: pathTo("scss") },
				{ find: /~\/stores\//, replacement: pathTo("stores") },
				{ find: /~\/modules\//, replacement: pathTo("modules") },
				{ find: /^~\//, replacement: pathTo("components") },
			]
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),

		// Compile Svelte components
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// Processes SCSS embedded within Svelte files
			preprocess: sveltePreprocess({
				scss: {
					includePaths: [pathTo("scss")],
					sourceMap: !production
				}
			}),
			// Emit CSS for scss plugin to bundle
			emitCss: true
		}),

		// Processes SCSS imported from other JS files and plugins
		scss({
			output: "public/build/bundle.css",
			outputStyle: production ? "compressed" : "",
			sourceMap: !production,
		}),

		// Convert CommonJS modules to ES6
		commonjs(),

		// Web workers
		// fixMapSources throws error, skipping inline sourcemap
		webWorkerLoader({ 
			sourcemap:false, 
			extensions:[".ts", ".js"] 
		}),

		// Process TS
		typescript({ 
			sourceMap: !production 
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// Transpile
		production && babel({
			extensions: [".js", ".jsx", ".es6", ".es", ".mjs", ".svelte"],
			babelHelpers: "runtime",
			presets: [["@babel/preset-env", { targets: "> 0.25%, not dead" }]],
			plugins: ["@babel/plugin-transform-runtime"]
		}),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
