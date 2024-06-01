<script lang="ts">
  import { useProgress } from "@threlte/extras";
  import { fade } from "svelte/transition";
  import { Canvas } from "@threlte/core";
  import { Project, Sheet, Studio } from "@threlte/theatre";
  import HeroScene from "@components/Hero/HeroScene.svelte";
  import state from "@assets/data/AFT.theatre-project-state.json";
  import {
    endRemovalPageAmount,
    pageAmount,
  } from "@components/Hero/definitions.ts";
  import Intro from "@components/Hero/Intro.svelte";
  import heroLoadingProgress, {
    tweenedProgress,
  } from "@stores/heroLoadingProgress.ts";
  import FadeOut from "@components/Hero/FadeOut.svelte";
  import { springPagedY } from "@stores/scroll.ts";
  import TheatreTextBox from "@components/Hero/TheatreTextBox.svelte";
  import ScrollSheet from "@components/Hero/ScrollSheet.svelte";
  import TheatreUnderline from "@components/Hero/TheatreUnderline.svelte";
  import Trigger from "@components/Hero/Trigger.svelte";

  const { progress } = useProgress();

  $effect(() => {
    tweenedProgress.set($progress);
    heroLoadingProgress.set($progress);
  });
</script>

<!-- 500vh = 4 Pages, so we need: (total pages + 1) * 100) -->
<div
  class="grid w-full grid-cols-1 overflow-hidden rounded-3xl"
  style={`height: ${(pageAmount + 1 - endRemovalPageAmount) * 100}vh`}
>
  {#if $tweenedProgress < 1}
    <div
      transition:fade|local={{
        duration: 200,
      }}
      class="element fixed z-[150] flex h-full w-full flex-col items-center justify-center gap-1 bg-skin-fill text-2xl font-bold"
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
      <FadeOut
        className="element fixed z-40 h-[100vh] w-full"
        progress={$springPagedY}
        from={5.25}
        to={6.0}
      >
        <Canvas>
          <HeroScene />
        </Canvas>
      </FadeOut>
      <Sheet name="Intro">
        <Intro />
      </Sheet>
      <ScrollSheet name="Meet">
        <Trigger inY={1} outY={1.9}>
          <FadeOut
            className="pointer-events-none"
            progress={$springPagedY}
            from={1.7}
            to={1.9}
          >
            <div
              class="pointer-events-auto fixed bottom-0 left-0 z-50 mb-8 flex min-h-10 w-screen flex-col items-center justify-center gap-12 px-8"
            >
              <TheatreTextBox key="Meet">
                <div class="flex flex-col gap-12">
                  <h2 class="text-6xl font-extrabold">
                    Meet
                    <span
                      class="bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent"
                    >
                      Rubber I
                    </span>
                  </h2>
                </div>
              </TheatreTextBox>
            </div>
          </FadeOut>
        </Trigger>
      </ScrollSheet>
      <ScrollSheet name="Middle Text">
        <Trigger inY={2} outY={4.5}>
          <FadeOut
            className="pointer-events-none"
            progress={$springPagedY}
            from={4}
            to={4.5}
          >
            <div class="fixed bottom-0 left-0 z-50 w-full">
              <div
                class="pointer-events-auto mx-auto mb-16 grid max-w-6xl grid-cols-3 gap-12 px-12"
              >
                <TheatreTextBox key="Modular">
                  <div class="flex flex-col gap-4">
                    <h3 class="text-4xl font-bold text-accent">Modular</h3>
                    <p>
                      With RUBBER I, the entire rocket is designed with
                      modularity in mind, increasing
                      <span class="underlined-span">
                        <TheatreUnderline key="Underline Upgradability" />
                        upgradability
                      </span>
                      and
                      <span class="underlined-span">
                        <TheatreUnderline key="Underline Repairability" />
                        repairability
                      </span>.
                    </p>
                  </div>
                </TheatreTextBox>
                <TheatreTextBox key="Resilient">
                  <div class="flex flex-col gap-4">
                    <h3 class="text-4xl font-bold text-accent">Resilient</h3>
                    <p>
                      The RUBBER I is designed to be incredibly resilient to
                      failures and accidents, achieved through
                      <span class="underlined-span">
                        <TheatreUnderline key="Underline Segmentation" />
                        segmentation
                      </span>
                      and
                      <span class="underlined-span">
                        <TheatreUnderline key="Underline Redundancy" />
                        redundancy
                      </span>.
                    </p>
                  </div>
                </TheatreTextBox>
                <TheatreTextBox key="Fast">
                  <div class="flex flex-col gap-4">
                    <h3 class="text-4xl font-bold text-accent">Fast</h3>
                    <p>
                      With the RUBBER I, a trip to Mars takes only
                      <span class="underlined-span">
                        <TheatreUnderline key="Underline Time" />
                        45 Days
                      </span>, as opposed to the typical 7 months, allowing for
                      increased
                      <span class="underlined-span">
                        <TheatreUnderline key="Underline Safety" />
                        safety
                      </span>.
                    </p>
                  </div>
                </TheatreTextBox>
              </div>
            </div>
          </FadeOut>
        </Trigger>
      </ScrollSheet>
      <ScrollSheet name="End Text">
        <Trigger inY={5} outY={6.25}>
          <FadeOut
            className="pointer-events-none"
            progress={$springPagedY}
            from={6}
            to={6.25}
          >
            <div
              class="fixed bottom-0 left-0 z-50 flex h-full w-full items-center justify-center"
            >
              <TheatreTextBox key="End Text" class="pointer-events-auto">
                <h2 class="text-4xl font-extrabold">
                  Join us in Colonizing a
                  <span
                    class="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                  >
                    Better Future!
                  </span>
                </h2>
              </TheatreTextBox>
            </div>
          </FadeOut>
        </Trigger>
      </ScrollSheet>
    </Project>
  </Studio>
</div>

<style>
  .element {
    @apply col-start-1 col-end-1 row-start-1 row-end-1;
  }
  .underlined-span {
    @apply relative inline-block;
  }
</style>
