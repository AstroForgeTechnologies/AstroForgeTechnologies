import { writable } from "svelte/store";

const themes: Record<string, number> = {
  dark: 0,
  light: 1,
};
const themeValues = Object.keys(themes);

const { subscribe, set, update } = writable(themeValues[0]);

const inverseTheme = () => {
  update(theme => themeValues[(themes[theme] + 1) % themeValues.length]);
};

export default {
  subscribe,
  inverseTheme,
  set,
};
