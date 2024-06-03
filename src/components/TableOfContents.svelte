<script lang="ts">
  import type { MarkdownHeading } from "astro";
  import { mapLinear } from "three/src/math/MathUtils";
  import scroll from "@stores/scroll.ts";

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

  // Get All Heading Anchors & Apply Actions
  const headingAnchors = Array.from(
    document.getElementsByClassName("heading-anchor"),
  );

  let closest: string = $state("");
  let ticking: boolean = $state(false);
  const yPositionCorrelations: Map<number, Element> = $state(new Map());
  let yPositionLocations: number[] = $state([]);

  // Carefully Generate Heading Anchor Locations
  function generateYPositions() {
    const absoluteYPositions: { y: number; element: Element }[] =
      headingAnchors.map(anchor => {
        return {
          y: anchor.getBoundingClientRect().y + window.scrollY,
          element: anchor,
        };
      });

    // Map Linear to 0 & 1, 1 being at the end of the page
    const mapped: { y: number; element: Element }[] = absoluteYPositions.map(
      ({ y, element }) => {
        // noinspection JSSuspiciousNameCombination
        return {
          y: mapLinear(
            y,
            0,
            document.documentElement.getBoundingClientRect().bottom +
              window.scrollY,
            0,
            1,
          ),
          element: element,
        };
      },
    );
    yPositionLocations = mapped.map(element => element.y);
    yPositionCorrelations.clear();
    mapped.forEach(e => yPositionCorrelations.set(e.y, e.element));
  }
  generateYPositions();

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => find());
      ticking = true;
    }
  }

  /* Find the Best Fit Element */
  function find() {
    let currentClosest = 0;
    yPositionLocations.some(i => {
      if (i >= $scroll) {
        return true;
      }
      currentClosest = i;
    });

    const foundId = yPositionCorrelations.get(currentClosest)?.id ?? "";

    if (closest !== foundId) closest = foundId;
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
