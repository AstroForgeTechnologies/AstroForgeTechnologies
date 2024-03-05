import type { CollectionEntry } from "astro:content";
import getSortedPosts from "./getSortedPosts";
import { hasTag, type Tag } from "@utils/tagHelper.ts";

const getPostsByTag = (posts: CollectionEntry<"blog">[], tag: Tag) =>
  getSortedPosts(posts.filter(post => hasTag(post.data.tags, tag)));

export default getPostsByTag;
