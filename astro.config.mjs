import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import { defineConfig, squooshImageService } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import config from "./src/config/config.json";

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: config.site.base_url,
  base: config.site.base_path,
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  image: {
    service: squooshImageService(),
  },
  integrations: [react(), sitemap(), tailwind({
    config: {
      applyBaseStyles: false,
    },
  }), AutoImport({
    imports: [
      "@/shortcodes/Button",
      "@/shortcodes/Accordion",
      "@/shortcodes/Notice",
      "@/shortcodes/Video",
      "@/shortcodes/Youtube",
      "@/shortcodes/Tabs",
      "@/shortcodes/Tab",
    ],
  }), expressiveCode({
    styleOverrides: {
      // You can also override styles
      borderWidth: '3px',
      borderRadius: '0',
      frames: {
        frameBoxShadowCssValue: 'none',
        editorBackground: '#00000007',
        editorTabBorderRadius: '0',
        borderRadius: '0',
      },
    },
  }), mdx()],
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
      theme: "one-light",
      wrap: true,
    },
    extendDefaultPlugins: true,
  },
});
