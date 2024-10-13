import { defineConfig } from 'astro/config';

// https://astro.build/config
//export default defineConfig({});
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
});