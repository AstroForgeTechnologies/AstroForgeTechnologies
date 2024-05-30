<script lang="ts">
  import { tweenedY } from "@stores/scroll.ts";
</script>

<div class="progress-container fixed top-0 z-[1000] h-1 w-full bg-skin-fill">
  <div
    class="progress-bar h-1 w-0 bg-skin-accent"
    style:width={`${$tweenedY * 100}%`}
  ></div>
</div>
