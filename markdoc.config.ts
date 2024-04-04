import { defineMarkdocConfig, component, nodes } from '@astrojs/markdoc/config';
import shiki from '@astrojs/markdoc/shiki';

export default defineMarkdocConfig({
  extends: [shiki({
    theme: 'one-dark-pro',
    wrap: true,
    langs: [],
  })],
  nodes: {
    document: {
      ...nodes.document,
      render: undefined,
    }
  },
  tags: {
    image: {
      render: component("./src/components/ImageCaption.astro"),
      attributes: {
        img: { type: String, required: true },
        alt: { type: String },
        caption: { type: String },
      },
    },
    layout: {
      render: component("./src/components/LayoutComponent.astro"),
      attributes: {
        layout: { type: Array },
      },
    },
    "layout-area": {
      render: component("./src/components/LayoutArea.astro"),
    }
  }
})
