import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "@utils/slugify.ts";
import { emojify } from "node-emoji";

const uniqueSlug = (tag: Tag, index: number, self: Tag[]): unknown =>
  tag.tagSlug &&
  self.findIndex(found => found.tagSlug === tag.tagSlug) === index;

export interface Tag {
  tagSlug: string;
  tagName: string;
}

export function getTag(tag: string): Tag {
  return {
    tagSlug: slugifyStr(tag),
    tagName: emojify(tag),
  };
}

export function hasTag(tags: string[], tag: Tag): boolean {
  for (const value of tags) {
    if (slugifyStr(value) === tag.tagSlug) return true;
  }
  return false;
}

export default function getUniqueTags(
  posts: CollectionEntry<"development">[]
): Tag[] {
  return posts
    .flatMap(post => post.data.tags)
    .map(tag => {
      return getTag(tag);
    })
    .filter(uniqueSlug)
    .sort((tagA, tagB) => tagA.tagSlug.localeCompare(tagB.tagSlug));
}

export function getUniqueTagsOfTags(tags: string[]): Tag[] {
  return tags
    .map(tag => {
      return getTag(tag);
    })
    .filter(uniqueSlug)
    .sort((tagA, tagB) => tagA.tagSlug.localeCompare(tagB.tagSlug));
}
