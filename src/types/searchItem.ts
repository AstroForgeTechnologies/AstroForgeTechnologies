import type { CollectionEntry } from "astro:content";

export default interface SearchItem {
  title: string;
  description: string;
  url: string;
  dataPost?: CollectionEntry<"development">["data"];
  dataSection?: CollectionEntry<"section">["data"];
}
