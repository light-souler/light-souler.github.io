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

import { pluginFramesTexts } from 'astro-expressive-code'

// remove "copy to clipboard" text when hover to Expressive-Code Copy button
pluginFramesTexts.overrideTexts(undefined, {
  copyButtonTooltip: ' ',
})

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
    themes: ['light-plus'],
    styleOverrides: {
      // You can also override styles
      borderWidth: '1.4px',
      borderColor: 'Gray',
      borderRadius: '0',

      inlineButtonRadius: '0',
      inlineMarkerBorderRadius: '0',
       
      frames: {
        frameBoxShadowCssValue: 'none',
        editorBackground: 'ghostwhite',
        editorTabBorderRadius: '0',
        borderRadius: '0',
      },
    },

    plugins: [
      {
        name: 'Always Show Copy Button (with border style)',
        baseStyles: `
          @media (hover: hover) {
            .copy button {
              opacity: 1;
              border-radius: 0;
              border-color: ghostwhite;
            }
          }
        `,
      },
      {
        name: 'Custom Copy Button Feedback',
        baseStyles: `
          .copy .feedback {
            display: none;
    
            & + button::after {
              -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black' stroke='none' stroke-width='1.75'%3E%3Cpath d='M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z'/%3E%3C/svg%3E");
              mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black' stroke='none' stroke-width='1.75'%3E%3Cpath d='M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z'/%3E%3C/svg%3E");
            }
          }
        `,
      },
      // {
      //   name: 'Custom Copy Button Feedback',
      //   baseStyles: `
      //     .copy .feedback {
      //       display: none;
    
      //       &.show + button::after {
      //         -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black' stroke='none' stroke-width='1.75'%3E%3Cpath d='M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z'/%3E%3C/svg%3E");
      //         mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black' stroke='none' stroke-width='1.75'%3E%3Cpath d='M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z'/%3E%3C/svg%3E");
      //       }
      //     }
      //   `,
      // },
    ]
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
      // theme: "one-light",
      wrap: true,
    },
    extendDefaultPlugins: true,
  },
});
