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
    class="md:mt-[30vh] pointer-events-none fixed left-0 top-0 z-[125] mt-[18vh] w-screen px-8 pb-5"
    style="transform: translateY({$springPagedY * -150}px)"
  >
    <div
      class="pointer-events-auto mx-auto my-auto flex w-max flex-col items-center justify-center"
    >
      <TheatreTextBox key="title">
        <h1
          class="bg-gradient-to-br from-primary to-accent bg-clip-text text-center text-6xl font-extrabold text-accent text-transparent"
        >
          Astro Forge Technologies
        </h1>
      </TheatreTextBox>
      <TheatreTextBox key="our-mission">
        <h2 class="mt-12 text-2xl font-bold text-gray-500">Our Mission:</h2>
      </TheatreTextBox>
      <TheatreTextBox key="description">
        <p class="mt-4 max-w-96 pb-1 text-center text-2xl">
          Bring
          <span class="underlined-span">
            <TheatreUnderline key="underline-you" />
            You
          </span>
          to Mars as
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
      <TheatreTextBox key="Buttons">
        <div class="mt-12 flex flex-row gap-8 px-16 pb-32 pt-1">
          <a href="/development/" class="popButton bg-secondary">
            Development Posts
          </a>
          <a
            href="/section/"
            class="popButton bg-primary hover:shadow-2xl hover:shadow-primary"
          >
            The Mission →
          </a>
        </div>
      </TheatreTextBox>
      <IntroArrows />
    </div>
  </div>
</FadeOut>

<style>
  .underlined-span {
    @apply relative inline-block;
  }
  .popButton {
    @apply inline-block translate-y-0 transform rounded-lg px-8 py-3 transition-all duration-200 hover:-translate-y-1;
  }
</style>
