module.exports = {
  env: {
    node: true,
    es2022: true,
    browser: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:astro/recommended",
    "plugin:prettier/recommended",
    "plugin:svelte/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    quotes: [2, "double", { avoidEscape: true }],
    semi: [2, "always"],
    "eol-last": [2, "always"],
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@babel/eslint-parser",
      rules: {
        "no-undef": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "no-unused-vars": "off",
      },
    },
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {},
    },
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".svelte"],
      },
      rules: {
        "svelte/no-at-html-tags": "off",
        "svelte/valid-compile": "off",
      },
    },
  ],
};
