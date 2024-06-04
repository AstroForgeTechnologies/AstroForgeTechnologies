<script lang="ts">
  import type { MarkdownHeading } from "astro";

  interface Props {
    headings: MarkdownHeading[];
  }

  const { headings }: Props = $props();
  let elements: Record<string, Element | undefined> = $state({});

  // Remove Null Values
  $effect(() => {
    Object.getOwnPropertyNames(elements).forEach(key => {
      if (!elements[key]) {
        delete elements[key];
      }
    });
  });

  // Get All Heading Anchors & Apply Actions (But ensure it works with SSR)
  const headingAnchors =
    typeof document !== "undefined" && document
      ? Array.from(document.getElementsByClassName("heading-anchor"))
      : [];

  let closest: string = $state("");
  let ticking: boolean = $state(false);

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => find());
      ticking = true;
    }
  }

  /* Find the Best Fit Element */
  function find() {
    let currentClosest: number = headingAnchors.findIndex(
      element => element.getBoundingClientRect().y > 25,
    );

    let element: string;
    if (currentClosest === -1) element = headingAnchors.at(-1)?.id || "";
    else if (currentClosest > 0)
      element = headingAnchors[currentClosest - 1]?.id || "";
    else element = "";

    if (closest !== element) closest = element;
    ticking = false;
  }
  find();
</script>

<svelte:window onscroll={onScroll} />

<div class="flex w-72 items-start">
  <div
    class="sticky top-[150px] ml-16 flex w-72 min-w-0 flex-col gap-3 border-l-2 border-primary/50 py-4 pl-4"
  >
    {#each headings as heading}
      <a
        href={`#${heading.slug}`}
        class={`w-72 min-w-0 transition-colors duration-200 ${closest === heading.slug ? "text-primary hover:text-accent" : "text-skin-base/50 hover:text-skin-base"}`}
        style={`margin-left: calc(${heading.depth - 2} * 1rem)`}
        bind:this={elements[heading.slug]}
      >
        {heading.text}
      </a>
    {/each}
  </div>
</div>
