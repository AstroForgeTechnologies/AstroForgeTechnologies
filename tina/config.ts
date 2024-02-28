import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const invalid = /^[^\\/#?\s]+$/;
const invalidGlobal = /[\\/#?\s]/gm;

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "src",
      publicFolder: "assets",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "blog",
        label: "Blogs",
        path: "src/content/blog",
        format: "mdx",
        frontmatterFormat: "yaml",
        frontmatterDelimiters: "---",
        ui: {
          beforeSubmit: async (
            { values}) => {
            const keys = Object.keys(values);

            if (keys.includes("tags")) {
              const list = values.tags as string[]
              for (let i = 0; i < list.length; i++) {
                list[i] = list[i].replaceAll(invalidGlobal, "-")
              }
              values.tags = list;
            }

            if (keys.includes("initialCreation")) {
              if (values.initialCreation || values.initialCreation === "true")
                delete values.initialCreation
                return values;
            }

            return {
              ...values,
              modDatetime: new Date().toISOString(),
            }},
        },
        templates: [
          {
            name: "posts",
            label: "Post",
            ui: {
              defaultItem: () => {
                return {
                  pubDatetime: new Date().toISOString(),
                  initialCreation: true,
                }
              },
            },
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                isTitle: true,
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true,
              },
              {
                label: 'Tags',
                name: 'tags',
                type: 'string',
                list: true,
                required: true,
                description: "Any Invalid Characters ('\\', '/', '#', '?', ' ')," +
                  "will be replaced by '-' !",
              },
              {
                label: 'Authors',
                name: 'authors',
                type: 'string',
                list: true,
                required: true,
                options: [
                  {
                    value: 'isaac',
                    label: 'Isaac',
                  },
                  {
                    value: 'will',
                    label: 'Will',
                  },
                  {
                    value: 'christy',
                    label: 'Christy',
                  },
                ],
              },
              {
                type: "boolean",
                name: "featured",
                label: "Featured",
              },
              {
                type: "string",
                name: "slug",
                label: "Slug",
                ui: {
                  validate: (value: string) => {
                    if (!value) return;
                    if (!invalid.test(value)) {
                      return "Slug is Not Valid!";
                    }
                    return undefined;
                  },
                },
              },
              {
                type: "datetime",
                name: "pubDatetime",
                label: "Publish Date",
                description: "Automatically Filled In.",
              },
              {
                type: "datetime",
                name: "modDatetime",
                label: "Modified Date",
                description: "Automatically Filled In, When Needed.",
              },
              {
                type: "boolean",
                name: "initialCreation",
                label: "Initial Creation",
                description: "Do Not Change!",
              },
              {
                type: "rich-text",
                name: "body",
                label: "Body",
                isBody: true,
                required: true,
              },
            ],
          }],
      },
    ],
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN,
      stopwordLanguages: ['eng'],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
});
