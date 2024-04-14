<script lang="ts" context="module">
  import mermaid from "mermaid";

  let graphNum = 0;

  mermaid.initialize({
    startOnLoad: false,
    theme: "dark",
    darkMode: false,
  });
</script>

<script lang="ts">
  import { HTMLElement, parse } from "node-html-parser";
  import theme from "@store/themeStore"

  interface Props {
    code?: string;
  }

  let { code }: Props = $props()

  let wrapper: HTMLDivElement;

  let svgOut = $state();
  $effect(() =>{
    const light = $theme === "light";
    mermaid.initialize({
      startOnLoad: false,
      theme: light ? "default" : "dark",
      darkMode: !light,
    });
    svgOut = mermaid.render(`graph-${graphNum++}`, code ?? "").then((value) => {
      const svg = value.svg;
      const root: HTMLElement = parse(svg);
      //root.firstChild.setAttribute("style", "width:45rem; height:45rem; max-width:45rem; max-height:45rem; font-size:1rem;");
      root.firstChild.setAttribute("style", "width:100%; height:auto")
      root.firstChild.removeAttribute("width");
      return root.toString();
    });
  });
</script>

<div class="border-2 border-skin-line my-8 p-6" bind:this={wrapper}>
  <div>
  {#await svgOut}
    <p>Loading...</p>
  {:then svg}
      {@html svg}
  {:catch error}
    <p class="font-bold">Something Went Wrong!</p>
    <p>{error}</p>
  {/await}
  </div>
</div>
