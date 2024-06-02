<script lang="ts">
  import { createSheetObjectAction } from "@threlte/theatre";
  import { types } from "@utils/theatre.ts";

  const sheetObject = createSheetObjectAction();

  interface Props {
    key: string;
  }

  const { key, ...others }: Props = $props();
</script>

<div
  {...others}
  use:sheetObject={{
    key,
    props: {
      scaleX: types.number(0, {
        range: [0, 1],
      }),
    },
    callback(node, props) {
      node.style.transform = `scaleX(${props.scaleX})`;
    },
  }}
  class="absolute -bottom-0.5 left-0 -z-10 h-2 w-full origin-left rounded-lg bg-accent will-change-transform"
></div>
