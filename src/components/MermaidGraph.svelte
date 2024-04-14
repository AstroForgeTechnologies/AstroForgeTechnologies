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
    caption?: string;
  }

  let { code, caption }: Props = $props();
  let wrapper: HTMLDivElement;
  let currentGraphNum = graphNum++;

  let svgOut = $state();
  $effect(() =>{
    const light = $theme === "light";
    mermaid.initialize({
      startOnLoad: false,
      theme: light ? "default" : "dark",
      darkMode: !light,
    });

    svgOut = mermaid.render(`mermaid-graph-${currentGraphNum}`, code ?? "").then((value) => {
      const svg = value.svg;
      const root: HTMLElement = parse(svg);

      root.firstChild.setAttribute("style", "width:100%; height:auto");
      root.firstChild.setAttribute("role", "img");
      root.firstChild.removeAttribute("width");

      if (caption) {
        const captionID = `mermaid-graph-title-${currentGraphNum}`;
        root.firstChild.setAttribute("aria-labelledby", captionID);
        root.firstChild.appendChild(parse(`<title id="${captionID}">${caption}</title>`));
      }

      return root.toString();
    });
  });
</script>

<figure class="flex flex-col items-center justify-center rounded-xl my-8">
  <div class="border-2 border-skin-line p-6 w-full h-full" bind:this={wrapper}>
    {#await svgOut}
      <p>Loading...</p>
    {:then svg}
        {@html svg}
    {:catch error}
      <p class="font-bold">Something Went Wrong!</p>
      <p>{error}</p>
    {/await}
  </div>
  <figcaption style="text-align: center">{caption}</figcaption>
</figure>
