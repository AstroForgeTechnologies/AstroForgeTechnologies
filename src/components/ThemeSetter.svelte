<script lang="ts">
  import theme from "@store/themeStore";

  /** Section: Copied from `public/toggle-theme.js`.
   * No Way to Import Public JS Files.
   */
  const primaryColorScheme = "dark";

  let themeValue = getTheme();

  // set early so no page flashes / CSS is made aware
  reflectTheme(themeValue);

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

  /**
   * Normal Section
   * Must Be Below Copied Section, Uses Functions from There
   **/
  theme.set(getTheme());

  // Immediately Reflect Theme (early)
  reflectTheme($theme);

  $effect(() => {
    // Save to Local Storage
    localStorage.setItem("theme", $theme);

    // Reflect Theme on Change to Theme Store, or Load
    reflectTheme($theme);
  });

  // Sync with Preferred Color Scheme Changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", ({ matches: isDark }) => {
      theme.set(isDark ? "dark" : "light");
    });
</script>
