import type { CollectionEntry } from "astro:content";

const postFilter = ({ data }: CollectionEntry<"development">) => {
  return !data.draft;
};

export default postFilter;
