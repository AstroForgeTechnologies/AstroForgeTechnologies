<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import PostCard from "@components/PostCard.svelte";
  import { slugifyStr } from "@utils/slugify.ts";

  interface Props {
    posts: CollectionEntry<"development">[];
  }

  let { posts }: Props = $props()
</script>

{#each posts as post}
  <PostCard href={`/development/${slugifyStr(post.slug)}/`} frontmatter={post.data} />
{/each}
