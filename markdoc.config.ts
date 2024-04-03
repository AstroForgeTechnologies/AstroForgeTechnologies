import { defineMarkdocConfig, component, nodes } from '@astrojs/markdoc/config';
import prism from "@astrojs/markdoc/prism";

export default defineMarkdocConfig({
  extends: [prism()],
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
