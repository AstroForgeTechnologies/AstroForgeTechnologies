import type { CollectionEntry } from "astro:content";
import getSortedPosts from "./getSortedPosts";
import { hasTag, type InputTag, type Tag } from "@utils/tagHelper.ts";

const getPostsByTag = (posts: CollectionEntry<"development">[], tag: Tag) =>
  getSortedPosts(
    posts.filter(post => hasTag(post.data.tags as InputTag[], tag)),
  );

export default getPostsByTag;
