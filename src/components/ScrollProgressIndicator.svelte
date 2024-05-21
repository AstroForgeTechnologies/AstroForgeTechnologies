<script lang="ts">
  import { tweened } from "svelte/motion";

  let scrollY = $state(0);
  const offsetHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const scrollWidth = tweened(0, {
    duration: 100,
  });

  $effect(() => {
    scrollWidth.set(Math.min((scrollY / offsetHeight) * 100, 100));
  });
</script>

<svelte:window bind:scrollY />

<div class="progress-container fixed top-0 z-[1000] h-1 w-full bg-skin-fill">
  <div
    class="progress-bar h-1 w-0 bg-skin-accent"
    style:width={`${$scrollWidth}%`}
  ></div>
</div>
