import { defineConfig } from 'astro/config';

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  vite:{
    ssr:{
      noExternal: ['sonner']
    }
  },
  integrations: [preact({compat: true})]
});