<script lang="ts">
  import cn from "@utils/cn.ts";
  import { getContext } from "svelte";

  interface Props {
    type?: string;
    className?: string;
    translateX?: number | string;
    translateY?: number | string;
    translateZ?: number | string;
    rotateX?: number | string;
    rotateY?: number | string;
    rotateZ?: number | string;
  }

  let { type = "div", className, translateX = 0, translateY = 0, translateZ = 0, rotateX = 0, rotateY = 0, rotateZ = 0, ...params }: Props = $props();

  let item: HTMLDivElement;

  let mouseEntered = getContext("MOUSE_ENTERED");

  $effect(() => {
    if ($mouseEntered) {
      item.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else
      item.style.transform = "";
  });
</script>

<svelte:element
  bind:this={item}
  this={type}
  class={cn('w-fit transition duration-300 ease-linear', className)}
  {...params}
>
  <slot />
</svelte:element>
