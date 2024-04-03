import { config, fields, collection, component } from '@keystatic/core';
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

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: "AstroForgeTechnologies",
      name: "AstroForgeTechnologies.github.io",
    },
  },
  ui: {
    brand: {
      name: SITE.shortTitle ?? SITE.title,
      mark: () => {
        return <img src={"/favicon.svg"} height={24} alt={"Logo"} />
      }
    },
  },
  locale: "en-US",
  collections: {
    development: collection({
      label: 'Development Posts',
      slugField: 'title',
      path: 'src/content/development/*',
      format: { contentField: 'content' },
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: {
            label: 'Title',
            validation: { isRequired: true }
          },
        }),
        description: fields.text({
          label: "Description",
          validation: { isRequired: true },
        }),
        pubDatetime: fields.datetime({
          label: "Published Date",
          description: "Do Not Change!",
          validation: { isRequired: true },
          defaultValue: new Date().toISOString(),
        }),
        modDatetime: fields.datetime({
          label: "Modified Date",
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
                  return { label: tag.tagName, value: tag.tagName }
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
        authors: fields.array(
          fields.select({
            label: "Authors",
            options: [
              ...Object.keys(authors).map((authorID) => {
                return {
                  label: authors[authorID], value: authorID
                }}),
            ],
            defaultValue: "isaac",
          }),
          {
            label: "Authors",
            itemLabel: (props) => authors[props.value],
            validation: { length: { min: 1 }},
          },
        ),
        content: fields.document({
          label: 'Content',
          formatting: true,
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
                )
              },
              label: "Image",
              schema: {
                img: fields.image({
                  label: "Image",
                  directory: "src/assets/images",
                  publicPath: "/src/assets/images",
                  validation: { isRequired: true }
                }),
                alt: fields.text({ label: 'Alt' }),
                caption: fields.text({ label: 'Caption' }),
              }
            }),
          },
        }),
      },
    }),
  },
});
