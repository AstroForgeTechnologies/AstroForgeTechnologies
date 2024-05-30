<script lang="ts">
  import { useProgress } from "@threlte/extras";
  import { fade } from "svelte/transition";
  import { Canvas } from "@threlte/core";
  import { Project, Sheet, Studio } from "@threlte/theatre";
  import HeroScene from "@components/Hero/HeroScene.svelte";
  import state from "@assets/data/AFT.theatre-project-state.json";
  import { pageAmount } from "@components/Hero/definitions.ts";
  import Intro from "@components/Hero/Intro.svelte";
  import heroLoadingProgress, {
    tweenedProgress,
  } from "@stores/heroLoadingProgress.ts";

  const { progress } = useProgress();

  $effect(() => {
    tweenedProgress.set($progress);
    heroLoadingProgress.set($progress);
  });
</script>

<!-- 500vh = 4 Pages, so we need: (total pages + 1) * 100) -->
<div
  class="grid w-full grid-cols-1 overflow-hidden rounded-3xl"
  style={`height: ${(pageAmount + 1) * 100}vh`}
>
  {#if $tweenedProgress < 1}
    <div
      transition:fade|local={{
        duration: 200,
      }}
      class="element fixed z-10 flex h-full w-full flex-col items-center justify-center gap-1 bg-skin-fill text-2xl font-bold"
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

  <Studio enabled={false}>
    <Project name="AFT" config={{ state }}>
      <div class="element fixed z-0 h-[100vh] w-full">
        <Canvas>
          <HeroScene />
        </Canvas>
      </div>
      <Sheet name="Intro">
        <Intro />
      </Sheet>
    </Project>
  </Studio>
</div>

<style>
  .element {
    @apply col-start-1 col-end-1 row-start-1 row-end-1;
  }
</style>
