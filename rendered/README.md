# The page as the desk sees it

- `4471-split.png`: screenshot of `/kb/incidents/4471-split`, rendered with the layout and components in `src/`.
- `site/`: the prerendered kb (`site/kb/incidents/4471-split.html`). Serve `site/` and open `/kb/incidents/4471-split.html`.
- `vite.config.js`: the build config used. The export has no build setup, so this one adds SvelteKit 3, mdsvex and adapter-static, with `"imports": { "#lib/*": "./src/lib/*" }` in `package.json`.
