<script lang="ts">
  import cn from "@utils/cn.ts";

  export interface Props {
    className?: string;
  }
  let { className }: Props = $props()
</script>

<div
  class={cn("h-96 w-96 transform-style-3d", className)}
>
  <slot />
</div>
