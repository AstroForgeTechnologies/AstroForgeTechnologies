<script lang="ts">
  import { scrollPagedY } from "@stores/scroll.ts";
  import type { Snippet } from "svelte";

  // https://github.com/threlte/threlte/blob/main/apps/docs/src/components/Hero/Trigger.svelte
  // Ported to Svelte 5

  interface Props {
    inY: number;
    outY: number;
    children: Snippet;
    fallback?: Snippet;
  }
  let { inY, outY, children, fallback }: Props = $props();
</script>

{#if (inY === undefined || $scrollPagedY > inY) && (outY === undefined || $scrollPagedY < outY)}
  {@render children()}
{:else}
  {@render fallback()}
{/if}
