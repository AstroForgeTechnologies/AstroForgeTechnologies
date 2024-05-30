<script lang="ts">
  import { scrollPagedY, springPagedY } from "@stores/scroll.ts";
  import type { ISheet } from "@theatre/core";
  import { mapLinear } from "three/src/math/MathUtils";
  import { Sheet } from "@threlte/theatre";
  import type { Snippet } from "svelte";
  import { totalSeconds, pageAmount } from "@components/Hero/definitions.ts";

  /**
   * Largely inspired by https://github.com/threlte/threlte/blob/main/apps/docs/src/components/Hero/ScrollSheet.svelte.
   */

  interface Props {
    name: string;
    startAtScrollPosition?: number;
    endAtScrollPosition?: number;
    useSpring?: boolean;
    children: Snippet;
  }

  const {
    name,
    startAtScrollPosition = 0,
    endAtScrollPosition = 1,
    useSpring = true,
    children,
  }: Props = $props();

  // Change these when pages change

  let sheet: ISheet | undefined = $state();
  let sheetProgress = $state(0);

  $effect(() => {
    sheetProgress = Math.min(
      Math.max(
        mapLinear(
          useSpring ? $springPagedY : $scrollPagedY,
          startAtScrollPosition,
          endAtScrollPosition,
          0,
          totalSeconds / pageAmount,
        ),
        0,
      ),
      totalSeconds,
    );
  });

  $effect(() => {
    if (sheet) {
      sheet.sequence.position = sheetProgress;
    }
  });
</script>

<Sheet bind:sheet {name}>
  {@render children()}
</Sheet>
