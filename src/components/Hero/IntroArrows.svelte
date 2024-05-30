<script>
  import { springPagedY } from "@stores/scroll";
  import FadeOut from "@components/Hero/FadeOut.svelte";
  import { createSheetObjectAction } from "@threlte/theatre";
  import { types } from "@utils/theatre";

  const sheetObject = createSheetObjectAction();
</script>

{#snippet arrow(className)}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    class="{className} -mb-[20px]"
    fill="#fff"
    viewBox="0 0 256 256"
  >
    <path
      d="M212.24,100.24l-80,80a6,6,0,0,1-8.48,0l-80-80a6,6,0,0,1,8.48-8.48L128,167.51l75.76-75.75a6,6,0,0,1,8.48,8.48Z"
    />
  </svg>
{/snippet}

<FadeOut progress={$springPagedY} from={0} to={0.2}>
  <div
    class="flex flex-col gap-2 will-change-auto"
    use:sheetObject={{
      key: "scroll",
      callback(node, props) {
        node.style.transform = `translateY(${props.translateY}%)`;
        node.style.opacity = props.opacity;
      },
      props: {
        opacity: types.number(0, {
          range: [0, 1],
        }),
        translateY: types.number(0, {
          range: [-500, 500],
        }),
      },
    }}
  >
    {@render arrow("pulse-1")}
    {@render arrow("pulse-2")}
    {@render arrow("pulse-3")}
  </div>
</FadeOut>

<style>
  @keyframes custom-pulse {
    50% {
      opacity: 0;
    }
  }

  .pulse-1 {
    animation: custom-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .pulse-2 {
    animation: custom-pulse 3s 0.3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .pulse-3 {
    animation: custom-pulse 3s 0.6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
</style>
