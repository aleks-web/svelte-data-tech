import adapter from '@sveltejs/adapter-node';
import { preprocessMeltUI, sequence } from '@melt-ui/pp';
import { relative, sep, resolve } from 'node:path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		runes: ({ filename }) => {
			const relativePath = relative(import.meta.dirname, filename);
			const pathSegments = relativePath.toLowerCase().split(sep);
			const isExternalLibrary = pathSegments.includes('node_modules');
			return isExternalLibrary ? undefined : true;
		}
	},
	preprocess: sequence([
		preprocessMeltUI()
	]),
	kit: {
		adapter: adapter(),
		alias: {
			$components: resolve('./src/components'),
		}
	}
};

export default config;
