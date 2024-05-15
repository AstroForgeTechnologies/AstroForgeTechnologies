<script lang="ts">
  import ModelScene from "@components/ModelScene.svelte";
  import { useProgress } from "@threlte/extras";
  import { tweened } from "svelte/motion";
  import { fade } from "svelte/transition";
  import { Canvas } from "@threlte/core";

  const { progress } = useProgress();
  const tweenedProgress = tweened($progress, {
    duration: 800,
  });
  $effect(() => {
    tweenedProgress.set($progress);
  });
</script>

<div
  class="grid grid-cols-1 overflow-hidden rounded-3xl border-4 border-skin-line"
>
  {#if $tweenedProgress < 1}
    <div
      transition:fade|local={{
        duration: 200,
      }}
      class="element z-10 flex h-full w-full flex-col items-center justify-center gap-1 bg-skin-fill text-2xl font-bold"
    >
      <h1>Loading...</h1>
      <div
        class="bar-wrapper my-2 h-5 w-1/2 overflow-hidden rounded-3xl border-4 border-skin-accent"
      >
        <div
          class="h-full rounded-3xl bg-skin-line"
          style="width: {$tweenedProgress * 100}%"
        ></div>
      </div>
    </div>
  {/if}

  <div class="element z-0 h-[48rem] w-full">
    <Canvas>
      <ModelScene useEnvMapBackground={true} />
    </Canvas>
  </div>
</div>

<style>
  .element {
    @apply col-start-1 col-end-1 row-start-1 row-end-1;
  }
</style>
