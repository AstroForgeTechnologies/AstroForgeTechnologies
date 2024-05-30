<script lang="ts">
  import { clamp, mapLinear } from "three/src/math/MathUtils.js";
  import type { Snippet } from "svelte";

  // https://github.com/threlte/threlte/blob/main/apps/docs/src/components/Hero/Reveal.svelte
  // Ported to Svelte 5

  interface Props {
    progress: number;
    from?: number;
    to?: number;
    children: Snippet;
  }
  let { progress = $bindable(), from = 0, to = 1, children }: Props = $props();

  let actualProgress = $state(0);
  $effect(() => {
    actualProgress = clamp(mapLinear(progress, from, to, 1, 0), 0, 1);
  });
</script>

<div style="opacity: {actualProgress};">
  {#if actualProgress > 0}
    {@render children()}
  {/if}
</div>
