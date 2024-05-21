<script lang="ts">
  import LinkButton from "@components/LinkButton.svelte";

  interface Props {
    activeNav?: "developments" | "credits" | "search";
  }

  let { activeNav }: Props = $props();

  let menuBtn: Element;
  let menuIcon: Element;
  let menuItems: Element;
  let expanded = $state(false);

  function toggleNav() {
    menuIcon?.classList.toggle("is-active");
    menuBtn.setAttribute(
      "aria-label",
      menuExpanded ? "Open Menu" : "Close Menu",
    );
    menuItems?.classList.toggle("display-none");
  }

  // Runs on view transitions navigation
  document.addEventListener("astro:after-swap", toggleNav);
</script>

<div class="nav-container">
  <a href="/" class="logo whitespace-nowrap">
    <img src="/favicon.svg" alt="Logo" class="h-10 w-10 py-1 sm:h-20 sm:w-20" />
  </a>
  <div class="top-nav-wrap">
    <a href="/" class="logo whitespace-nowrap">
      <h1 class="tracking-wider">AST</h1>
    </a>
    <nav id="nav-menu">
      <button
        class="hamburger-menu focus-outline"
        aria-label="Open Menu"
        aria-expanded={expanded ? "true" : "false"}
        aria-controls="menu-items"
        onclick={}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="menu-icon {}"
          bind:this={menuIcon}
        >
          <line x1="7" y1="12" x2="21" y2="12" class="line"></line>
          <line x1="3" y1="6" x2="21" y2="6" class="line"></line>
          <line x1="12" y1="18" x2="21" y2="18" class="line"></line>
          <line x1="18" y1="6" x2="6" y2="18" class="close"></line>
          <line x1="6" y1="6" x2="18" y2="18" class="close"></line>
        </svg>
      </button>
      <ul id="menu-items" class="display-none sm:flex" bind:this={menuItems}>
        <li>
          <a
            href="/development/"
            class={activeNav === "developments" ? "active" : ""}
          >
            Development
          </a>
        </li>
        <li>
          <a href="/credits/" class={activeNav === "credits" ? "active" : ""}>
            Credits
          </a>
        </li>
        <li>
          <LinkButton
            href="/search/"
            className={`headerButton focus-outline p-3 sm:p-1 ${
              activeNav === "search" ? "active" : ""
            } flex`}
            ariaLabel="search"
            title="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="scale-125 sm:scale-100"
              ><path
                d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"
              ></path>
            </svg>
            <span class="sr-only">Search</span>
          </LinkButton>
        </li>
      </ul>
    </nav>
  </div>
</div>

<style>
  .nav-container {
    @apply mx-auto flex max-w-3xl flex-col items-center justify-between sm:flex-row;
  }
  .top-nav-wrap {
    @apply relative flex w-full items-start justify-between px-4 py-0 sm:items-center sm:py-2;
  }
  .logo {
    @apply pb-1 pr-2 pt-4 text-xl font-semibold sm:static sm:text-2xl;
  }
  .hamburger-menu {
    @apply self-end p-2 sm:hidden;
  }
  .hamburger-menu svg {
    @apply h-6 w-6 scale-125 fill-skin-base;
  }
  nav {
    @apply flex w-full flex-col items-center sm:ml-2 sm:flex-row sm:justify-end sm:space-x-4 sm:py-0;
  }
  nav ul {
    @apply mt-4 grid w-44 grid-cols-2 grid-rows-4 gap-x-2 gap-y-2 sm:ml-0 sm:mt-0 sm:w-auto sm:gap-x-5 sm:gap-y-0;
  }
  nav ul li {
    @apply col-span-2 flex items-center justify-center;
  }
  nav ul li a {
    @apply w-full px-4 py-3 text-center font-medium hover:text-skin-accent sm:my-0 sm:px-2 sm:py-1;
  }
  nav ul li:nth-last-child(2) a {
    @apply w-auto;
  }
  nav ul li:nth-last-child(1),
  nav ul li:nth-last-child(2) {
    @apply col-span-1;
  }
  nav a.active {
    @apply underline decoration-wavy decoration-2 underline-offset-4;
  }
  nav a.active svg {
    @apply fill-skin-accent;
  }
  nav button {
    @apply p-1;
  }
  nav button svg {
    @apply h-6 w-6 fill-skin-base hover:fill-skin-accent;
  }
  .headerButton {
    @apply p-1;
  }
  .headerButton svg {
    @apply h-6 w-6 fill-skin-base hover:fill-skin-accent;
  }
  .menu-icon line {
    @apply transition-opacity duration-75 ease-in-out;
  }
  .menu-icon .close {
    opacity: 0;
  }
  .menu-icon.is-active .line {
    @apply opacity-0;
  }
  .menu-icon.is-active .close {
    @apply opacity-100;
  }
</style>
