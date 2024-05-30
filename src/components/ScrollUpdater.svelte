<script lang="ts">
  import scroll, { scrollPagedY } from "@stores/scroll.ts";

  const offsetHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const onScroll = () => {
    scroll.set(Math.max(window.scrollY / offsetHeight, 0));
    scrollPagedY.set(Math.max(window.scrollY / window.innerHeight, 0));
  };

  $effect(() => {
    scroll.setHard(Math.max(window.scrollY / offsetHeight, 0));
    scrollPagedY.setHard(Math.max(window.scrollY / window.innerHeight, 0));
  });
</script>

<svelte:window onscroll={onScroll} />
