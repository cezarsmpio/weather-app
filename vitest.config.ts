import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import svelteSVG from "vite-plugin-svelte-svg";

export default defineConfig({
  plugins: [
    svelteSVG({
      svgoConfig: {},
      requireSuffix: false,
    }),
    svelte({ hot: !process.env.VITEST }),
  ],
  test: {
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    globals: true,
    environment: "jsdom",
    setupFiles: ["vitest.setup.ts"],
  },
});
