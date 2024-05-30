<script lang="ts">
  import { createSheetObjectAction } from "@threlte/theatre";
  import Reveal from "./Reveal.svelte";
  import FadeOut from "./FadeOut.svelte";
  import type { Snippet } from "svelte";
  import { types } from "@utils/theatre.ts";

  // https://github.com/threlte/threlte/blob/main/apps/docs/src/components/Hero/Intro/TheatreTextBox.svelte
  // Moved to Svelte 5

  const sheetObject = createSheetObjectAction();

  let reveal = $state(0);
  let fade = $state(0);
  interface Props {
    key: string;
    children: Snippet;
  }

  const { key, children, ...others }: Props = $props();
</script>

<div
  {...others}
  use:sheetObject={{
    key,
    props: {
      opacity: types.number(1, {
        range: [0, 1],
      }),
      translateX: types.number(0, {
        range: [-100, 100],
      }),
      translateY: types.number(0, {
        range: [-100, 100],
      }),
      reveal: types.number(0, {
        range: [0, 1],
      }),
      fade: types.number(0, {
        range: [0, 1],
      }),
    },
    callback(node, props) {
      node.style.opacity = props.opacity;
      node.style.transform = `translate(${props.translateX}px, ${props.translateY}px)`;
      reveal = props.reveal;
      fade = props.fade;
    },
  }}
>
  <Reveal progress={reveal}>
    <FadeOut progress={fade}>
      {@render children()}
    </FadeOut>
  </Reveal>
</div>
