import { config, fields, collection, component } from "@keystatic/core";
import { SITE } from "./src/config";
import getUniqueTags from "./src/utils/tagHelper";
import { getCollection } from "astro:content";
import postFilter from "./src/utils/postFilter";

const tags = getUniqueTags(await getCollection("development", postFilter));

const tagConditional: Record<string, unknown> = {};
tags.map((tag) => tag.tagName).forEach((slug) => tagConditional[slug] = fields.empty());

const authors: Record<string, string> = {
  isaac: "Isaac",
  christy: "Christy",
  will: "Will",
};

// Keystatic currently only accepts dates with:
// 1. No Seconds or Milliseconds
// 2. No Time Zone (Assumes UTC)
// Including 1 Causes Invalid Field when saving, Including 2 Crashes Keystatic
function toISOKeystaticString(date: Date) {
  const pad = (num: number) => {
      return (num < 10 ? "0" : "") + num;
    };

  return date.getUTCFullYear() +
    "-" + pad(date.getUTCMonth() + 1) +
    "-" + pad(date.getUTCDate()) +
    "T" + pad(date.getUTCHours()) +
    ":" + pad(date.getUTCMinutes());
}

function isUseLocal() {
  const envBuildStatic = import.meta.env.PUBLIC_USE_LOCAL;
  let buildStatic = false;
  if (envBuildStatic) buildStatic = JSON.parse(envBuildStatic);
  return buildStatic;
}

const sharedDocument = fields.document({
    label: "Content",
    formatting: {
      inlineMarks: {
        bold: true,
        italic: true,
        strikethrough: true,
        code: true,
        keyboard: true,
        subscript: true,
        superscript: true,
        underline: true,
      },
      listTypes: {
        ordered: true,
        unordered: true,
      },
      headingLevels: [2, 3, 4, 5],
      blockTypes: {
        blockquote: true,
        code: true,
      },
      alignment: true,
      softBreaks: true,
    },
    dividers: true,
    links: true,
    images: undefined,
    tables: true,
    layouts: [[1], [1, 1], [1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1, 1]],
    componentBlocks: {
      image: component({
        preview: ({fields}) => {
          const url = fields.img.value?.data;
          return (
            <>
              {url && (
                <figure>
                  <img src={URL.createObjectURL(new Blob([url]))} alt={fields.alt.value} />
                  <figcaption style={{ textAlign: "center" }}>{fields.caption.value ?? ""}</figcaption>
                </figure>
              )}
            </>
          );
        },
        label: "Image",
        schema: {
          img: fields.image({
            label: "Image",
            directory: "src/assets/images",
            publicPath: "/src/assets/images",
            validation: { isRequired: true }
          }),
          alt: fields.text({ label: "Alt" }),
          caption: fields.text({ label: "Caption" }),
        }
      }),
      mermaid: component({
        preview: ({fields}) => (
          <div style={{ padding: "1rem 0" }}>
            <div style={{ padding: "1rem", borderStyle: "dashed", borderWidth: "2px" }}>
              {fields.graph.element}
            </div>
            <p style={{ textAlign: "center", fontWeight: 700 }}>{fields.caption.value ?? ""}</p>
          </div>
        ),
        label: "Mermaid Graph",
        schema: {
          graph: fields.child({
            kind: "block",
            placeholder: "Graph...",
            formatting: { inlineMarks: undefined, softBreaks: undefined },
            links: "inherit",
          }),
          caption: fields.text({ label: "Caption" }),
        },
      })
    },
  });

export default config({
  storage: {
    kind: isUseLocal() ? "local" : "github",
    repo: {
      owner: "AstroForgeTechnologies",
      name: "AstroForgeTechnologies.github.io",
    },
  },
  ui: {
    brand: {
      name: SITE.shortTitle ?? SITE.title,
      mark: () => {
        return <img src={"/favicon.svg"} height={24} alt={"Logo"} />;
      }
    },
  },
  locale: "en-US",
  collections: {
    development: collection({
      label: "Development Posts",
      slugField: "title",
      path: "src/content/development/*",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            validation: { isRequired: true }
          },
        }),
        description: fields.text({
          label: "Description",
          validation: { isRequired: true },
        }),
        pubDatetime: fields.datetime({
          label: "Published Date",
          description: "Do Not Change! (Displayed in UTC Time, To Fix)",
          validation: { isRequired: true },
          defaultValue: toISOKeystaticString(new Date()),
        }),
        modDatetime: fields.datetime({
          label: "Modified Date",
          description: "To Fix: Does not Currently Change Automatically. (Displayed in UTC Time, To Fix)"
        }),
        featured: fields.checkbox(
          {
            label: "Featured",
          }
        ),
        tags: fields.array(
          fields.conditional(
            fields.select({
              label: "Tags",
              options: [{label: "New Tag", value: "newTag"},
                ...tags.map((tag) => {
                  return { label: tag.tagName, value: tag.tagName };
                })],
              defaultValue: "newTag"}),
            {
              newTag: fields.text({
                label: "New Tag",
                validation: { isRequired: true },
              }),
              ...tagConditional,
            },
          ),
          {
            label: "Tags",
            itemLabel: (props) => {
              return props.value.value ?? props.discriminant;
            },
            validation: { length: { min: 1 }},
          }
        ),
        authors: fields.multiselect({
            label: "Authors",
            options: [
              ...Object.keys(authors).map((authorID) => {
                return {
                  label: authors[authorID], value: authorID
                };}),
            ],
          },
        ),
        content: sharedDocument,
      },
    }),
    section: collection({
      label: "Sections",
      slugField: "title",
      path: "src/content/section/*",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            validation: { isRequired: true }
          },
        }),
        image: fields.image({
          label: "Image",
          directory: "src/assets/images",
          publicPath: "/src/assets/images",
          validation: { isRequired: true }
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
          validation: { isRequired: true },
        }),
        tags: fields.array(
          fields.select({
            label: "Tags",
            options: tags.map((tag) => {
                return { label: tag.tagName, value: tag.tagName };
              }),
            defaultValue: tags[0].tagName,
          }),
          {
            label: "Related Tags",
            itemLabel: (props) => {
              return props.value;
            },
            validation: { length: { min: 1 }},
          }
        ),
        content: sharedDocument,
      },
    })
  },
  singletons: {
    credits: {
      label: "Credits",
      format: { contentField: "content" },
      entryLayout: "content",
      path: "src/content/singleton/credits",
      schema: {
        title: fields.text({
          label: "Title",
          validation: { isRequired: true },
        }),
        content: sharedDocument,
      },
    },
  }
});
