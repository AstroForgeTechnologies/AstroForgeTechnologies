<script lang="ts">
  import { Sequence } from "@threlte/theatre";
  import TheatreTextBox from "@components/Hero/TheatreTextBox.svelte";
  import FadeOut from "@components/Hero/FadeOut.svelte";
  import { springPagedY } from "@stores/scroll.ts";
  import TheatreUnderline from "@components/Hero/TheatreUnderline.svelte";
  import type { IRafDriver } from "@theatre/core";
  import { tweenedProgress } from "@stores/heroLoadingProgress.ts";
  import IntroArrows from "@components/Hero/IntroArrows.svelte";

  let play:
    | ((
        conf?:
          | {
              iterationCount?: number | undefined;
              range?: [from: number, to: number] | undefined;
              rate?: number | undefined;
              direction?:
                | "normal"
                | "reverse"
                | "alternate"
                | "alternateReverse"
                | undefined;
              rafDriver?: IRafDriver | undefined;
            }
          | undefined,
      ) => Promise<boolean>)
    | undefined = $state();

  $effect(() => {
    if (play && $tweenedProgress >= 1) {
      play();
    }
  });
</script>

<Sequence bind:play />

<FadeOut
  progress={$springPagedY}
  from={0.2}
  to={0.6}
  className="pointer-events-none"
>
  <div
    class="md:mt-[30vh] pointer-events-auto fixed left-0 top-0 z-[125] mt-[18vh] flex w-screen flex-col items-center justify-center gap-12 px-8 pb-5"
    style="transform: translateY({$springPagedY * -150}px)"
  >
    <TheatreTextBox key="title">
      <h1
        class="bg-gradient-to-br from-primary to-accent bg-clip-text py-2 text-center text-6xl font-extrabold text-accent text-transparent"
      >
        Astro Forge Technologies
      </h1>
    </TheatreTextBox>
    <TheatreTextBox key="our-mission">
      <h2 class="pb-0 text-base text-gray-500">Our Mission:</h2>
    </TheatreTextBox>
    <TheatreTextBox key="description">
      <p class="pt-1 text-lg">
        Bring
        <span class="underlined-span">
          <TheatreUnderline key="underline-you" />
          You
        </span>
        To Mars as
        <span class="underlined-span">
          <TheatreUnderline key="underline-quick" />
          Quickly
        </span>
        and
        <span class="underlined-span">
          <TheatreUnderline key="underline-safe" />
          Safely
        </span>
        as Possible.
      </p>
    </TheatreTextBox>
    <IntroArrows />
  </div>
</FadeOut>

<style>
  .underlined-span {
    @apply relative inline-block;
  }
</style>
