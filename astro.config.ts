import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
// noinspection ES6PreferShortImport
import { SITE } from "./src/config";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel/serverless";

import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";

let envKeyStatic = process.env.INCLUDE_KEYSTATIC;
let includeKeyStatic = false;
if (envKeyStatic) includeKeyStatic = JSON.parse(envKeyStatic);

let envBuildStatic = process.env.BUILD_STATIC;
let buildStatic = false;
if (envBuildStatic) envBuildStatic = JSON.parse(envBuildStatic);

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    tailwind({ applyBaseStyles: false }),
    react(),
    sitemap(),
    mdx(),
    markdoc({ allowHTML: true }),
    ...(includeKeyStatic && !buildStatic ? [keystatic()] : []),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  scopedStyleStrategy: "where",
  // Server is only used for Keystatic CMS
  output: buildStatic ? "static" : "hybrid",
  adapter: buildStatic ? undefined : vercel(),
});
