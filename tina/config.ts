import { defineConfig, tinaTableTemplate } from "tinacms";
import { unemojify } from "node-emoji";
import { slugifyStr } from "../src/utils/slugify";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

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
      mediaRoot: "assets/images",
      publicFolder: "public",
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
            // Remove Empty Values and Values in Arrays & Unemojify
            for (const key of Object.keys(values)) {
              if (!values[key]) {
                delete values[key];
                continue;
              }

              if (!Array.isArray(values[key])) {
                if (typeof values[key] !== "string") continue;
                values[key] = unemojify(values[key] as string);
                continue;
              }

              const list: unknown[] = values[key] as unknown[];
              if (!list || list.length === 0) {
                delete values[key];
                continue;
              }

              const newList = list.filter((value) => value);

              if (newList.length === 0) {
                delete values[key];
                continue;
              }

              if (typeof newList[0] !== "string") {
                values[key] = newList;
                continue;
              }

              values[key] = newList.map((value) => {
                if (typeof value !== "string") return value;
                return unemojify(value as string);
              });
            }

            const keys = Object.keys(values);

            // Mod Date Time Handling
            if (keys.includes("initialCreation")) {
              if (values.initialCreation || values.initialCreation === "true")
                delete values.initialCreation
                return values;
            }

            return {
              ...values,
              modDatetime: new Date().toISOString(),
            }},
          filename: {
            readonly: true,
            slugify: (values) => {
              return slugifyStr(values?.slug ? values.slug : values?.title ?? "")
            },
          }
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
                description: "Emojis are allowed, and encouraged!",
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
                description: "Optional. Emojis are allowed, but discouraged."
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
                templates: [
                  tinaTableTemplate,
                ]
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
