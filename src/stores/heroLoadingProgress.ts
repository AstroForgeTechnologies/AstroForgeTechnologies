import { writable } from "svelte/store";
import { tweened } from "svelte/motion";

const progress = writable(0);
export const tweenedProgress = tweened(0, {
  duration: 800,
});

export default progress;
