<script lang="ts">
  import cn from "@utils/cn.ts";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  const DEFAULT_REDUCER: number = 25;

  interface Props {
    className?: string;
    containerClassName?: string;
    reducer?: number;
  }

  let { className, containerClassName, reducer }: Props = $props();
  let container: HTMLDivElement;
  let mouseEntered = writable(false);

  setContext("MOUSE_ENTERED", mouseEntered);

  const handleMouseMove = (mouse: MouseEvent) => {
    if (!container) return;
    const { left, top, width, height } = container.getBoundingClientRect();

    const reduceBy = reducer ? reducer : DEFAULT_REDUCER;

    const x = (mouse.clientX - left - width / 2) / reduceBy;
    const y = (mouse.clientY - top - height / 2) / reduceBy;

    container.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };
</script>

<div
  class={ cn("py-20 flex items-center justify-center perspective-1000", containerClassName) }
>
  <div
    bind:this={container}
    onmouseenter={() => $mouseEntered = true}
    onmousemove={handleMouseMove}
    onmouseleave={() => {
      $mouseEntered = false;
      container.style.transform = "";
    }}
    role="figure"
    class={cn(
            `flex items-center justify-center relative transition-all duration-300 ease-linear transform-style-3d`,
            className
          )}
  >
    <slot />
  </div>
</div>
