<script lang="ts">
  import cn from "@utils/cn.ts";
  import { type Snippet } from "svelte";

  interface Props {
    className?: string;
    children: Snippet;
  }
  let { className, children }: Props = $props();
</script>

<div class={cn("size-96 transform-style-3d", className)}>
  {@render children()}
</div>
