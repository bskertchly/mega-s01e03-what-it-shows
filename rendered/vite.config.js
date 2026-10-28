import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

// Render-only setup for the kb export: the export ships src/ without a build config.
export default {
  plugins: [
    sveltekit({
      extensions: ['.svelte', '.svx'],
      preprocess: [vitePreprocess(), mdsvex({ extensions: ['.svx'], layout: { runbook: new URL('./src/lib/layouts/runbook.svelte', import.meta.url).pathname } })],
      adapter: adapter({ strict: false }),
      prerender: { entries: ['/kb', '/kb/incidents/4471-split', '/kb/incidents/4471'], handleHttpError: 'warn' },
    }),
  ],
};
