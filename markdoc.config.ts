import { component, defineMarkdocConfig, nodes } from "@astrojs/markdoc/config";
import shiki from "@astrojs/markdoc/shiki";

export default defineMarkdocConfig({
  extends: [shiki({
    theme: "one-dark-pro",
    wrap: true,
  })],
  nodes: {
    heading: {
      ...nodes.heading,
      render: component("./src/components/Headings.astro"),
    },
    document: {
      ...nodes.document,
      render: undefined,
    },
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
    },
    mermaid: {
      render: component("./src/components/MermaidWrapper.astro"),
      attributes: {
        caption: { type: String },
      }
    },
    sup: {
      render: component("./src/components/Superscript.astro"),
    },
    sub: {
      render: component("./src/components/Subscript.astro"),
    },
    u: {
      render: component("./src/components/Underline.astro"),
    }
  }
});
