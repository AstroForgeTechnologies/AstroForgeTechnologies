<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import { slugifyStr } from "@utils/slugify.ts";
  import Datetime from "@components/Datetime.svelte";
  import useModDateTime from "@utils/useModDateTime.ts";

  interface Props {
    href?: string;
    frontmatter: CollectionEntry<"development">["data"];
    secHeading?: boolean;
  }

  let { href, frontmatter, secHeading = true }: Props = $props();

  const { title, pubDatetime, modDatetime, description } = frontmatter;

  const headerProps = {
    style: `view-transition-name: ${slugifyStr(title)}`,
    class: "text-lg font-medium decoration-dashed hover:underline",
  };

  const useMod = useModDateTime(pubDatetime, modDatetime);
</script>

<li class="my-6">
  <a
    {href}
    class="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
  >
    {#if secHeading}
      <h2 {...headerProps}>{title}</h2>
    {:else}
      <h3 {...headerProps}>{title}</h3>
    {/if}
  </a>
  <Datetime
    dateTime={useMod ? modDatetime : pubDatetime}
    category={useMod ? "Updated" : "Published"}
  />
  <p>{description}</p>
</li>
