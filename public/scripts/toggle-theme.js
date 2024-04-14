// This has to be a js file, in public, because this script is called as `is:inline`
// That makes it pause rendering to load this script (which we need)
// But causes Astro to not process this script.

/* ANY UPDATES IN HERE MUST ALSO UPDATE @components/ThemeSetter.svelte! */

const primaryColorScheme = "dark";

let themeValue = getTheme();

// set early so no page flashes / CSS is made aware
reflectTheme(themeValue);

// Run Again on Load
window.onload = () => {
  reflectTheme(themeValue);

  // Run on Astro Swap
  document.addEventListener("astro:after-swap", () => reflectTheme(themeValue));
};

function getTheme() {
  const storageTheme = localStorage.getItem("theme");

  // return theme value in local storage if it is set
  if (storageTheme) return storageTheme;

  // return primary color scheme if it is set
  if (primaryColorScheme) return primaryColorScheme;

  // return user device's prefer color scheme
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function reflectTheme(inputThemeValue) {
  if (document.firstElementChild)
    document.firstElementChild.setAttribute("data-theme", inputThemeValue);

  // Get a reference to the body element
  const body = document.body;

  // Check if the body element exists before using getComputedStyle
  if (body) {
    // Get the computed styles for the body element
    const computedStyles = window.getComputedStyle(body);

    // Get the background color property
    const bgColor = computedStyles.backgroundColor;

    // Set the background color in <meta theme-color ... />
    document
      .querySelector("meta[name='theme-color']")
      ?.setAttribute("content", bgColor);
  }
}
