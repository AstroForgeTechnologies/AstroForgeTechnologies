import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
// noinspection ES6PreferShortImport
import { SITE } from "./src/config";
import vercel from "@astrojs/vercel/serverless";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
import icon from "astro-icon";
import svelte from "@astrojs/svelte";
import { threeMinifier } from "@yushijinhun/three-minifier-rollup";

const envKeyStatic = process.env.INCLUDE_KEYSTATIC;
let includeKeyStatic = false;
if (envKeyStatic) includeKeyStatic = JSON.parse(envKeyStatic);
const envBuildStatic = process.env.BUILD_STATIC;
let buildStatic = false;
if (envBuildStatic) buildStatic = JSON.parse(envBuildStatic);

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    svelte(),
    sitemap(),
    markdoc({
      allowHTML: true,
    }),
    icon({
      iconDir: "src/assets/icons",
      include: {
        ph: ["*"],
      },
    }),
    ...(includeKeyStatic && !buildStatic ? [keystatic()] : []),
  ],
  markdown: {
    remarkPlugins: [],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
  },
  vite: {
    plugins: [{ ...threeMinifier(), enforce: "pre" }],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js", "keystatic"],
    },
    ssr: {
      noExternal: ["three"],
    },
  },
  scopedStyleStrategy: "where",
  // Server is only used for Keystatic CMS
  output: buildStatic ? "static" : "hybrid",
  adapter: buildStatic ? undefined : vercel(),
});
