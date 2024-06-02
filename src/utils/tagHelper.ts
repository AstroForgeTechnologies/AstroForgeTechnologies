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

export function getTag(tag: InputTag): Tag {
  return getTagString(tag.value ?? tag.discriminant);
}

export function getTagString(tag: string): Tag {
  return {
    tagSlug: slugifyStr(tag),
    tagName: emojify(tag),
  };
}

export function hasTag(tags: InputTag[], tag: Tag): boolean {
  for (const value of tags) {
    if (slugifyStr(value.value ?? value.discriminant) === tag.tagSlug)
      return true;
  }
  return false;
}

export default function getUniqueTags(
  posts: CollectionEntry<"development">[],
): Tag[] {
  return posts
    .flatMap(post => post.data.tags)
    .map(tag => {
      return getTag(tag as InputTag);
    })
    .filter(uniqueSlug)
    .sort((tagA, tagB) => tagA.tagSlug.localeCompare(tagB.tagSlug));
}

export function getUniqueTagsOfTags(tags: InputTag[]): Tag[] {
  return tags
    .map(tag => {
      return getTag(tag);
    })
    .filter(uniqueSlug)
    .sort((tagA, tagB) => tagA.tagSlug.localeCompare(tagB.tagSlug));
}

export function getUniqueTagsOfTagStrings(tags: string[]): Tag[] {
  return tags
    .map(tag => {
      return getTagString(tag);
    })
    .filter(uniqueSlug)
    .sort((tagA, tagB) => tagA.tagSlug.localeCompare(tagB.tagSlug));
}

export interface InputTag {
  discriminant: string;
  value?: string;
}
