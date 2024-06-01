<script lang="ts">
  import type { ActiveNav } from "../types/activeNav.ts";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import LinkButton from "@components/LinkButton.svelte";

  interface Props {
    activeNav?: ActiveNav;
  }
  let { activeNav }: Props = $props();

  let scrollY = $state(0);

  const opacity = tweened(0, {
    duration: 100,
    easing: cubicOut,
  });
  $effect(() => {
    opacity.set(Math.min(scrollY, 100));
  });
</script>

<svelte:window bind:scrollY />

<header>
  <div class="fixed z-[75] h-28 w-full" id="header">
    <!-- Background -->
    <div class="absolute -z-10 h-full w-full bg-skin-fill"></div>
    <!-- Gradient -->
    <div
      class="pointer-events-none absolute top-full -z-20 h-7 w-full bg-gradient-to-b from-fill"
      style:opacity={$opacity}
    ></div>

    <!-- Navbar -->
    <ul
      class="relative mx-auto box-content flex h-20 max-w-4xl items-center justify-end gap-3 p-2 py-4 sm:gap-6"
    >
      <!-- Icon -->
      <li class="navbar-element mr-auto">
        <div class="flex flex-row items-center justify-center gap-4">
          <a href="/" class="mr-auto">
            <img src="/favicon.svg" alt="Logo" class="h-20 w-20" />
          </a>
          <a href="/" class="mr-auto">
            <h1 class="text-2xl font-bold tracking-wider">AFT</h1>
          </a>
        </div>
      </li>
      <li class="navbar-element">
        <a href="/about-us/" class={activeNav === "about-us" ? "active" : ""}>
          About Us
        </a>
      </li>
      <li class="navbar-element">
        <a
          href="/development/"
          class={activeNav === "developments" ? "active" : ""}
        >
          Development
        </a>
      </li>
      <li class="navbar-element">
        <a href="/credits/" class={activeNav === "credits" ? "active" : ""}>
          Credits
        </a>
      </li>
      <li class="navbar-element">
        <LinkButton
          href="/search/"
          className={`focus-outline p-3 sm:p-1 ${
            activeNav === "search" ? "active" : ""
          } flex`}
          ariaLabel="search"
          title="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class={`h-6 w-6 scale-125 ${activeNav === "search" ? "fill-skin-accent" : "fill-skin-base"} hover:fill-skin-accent sm:scale-100`}
            ><path
              d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"
            ></path>
          </svg>
          <span class="sr-only">Search</span>
        </LinkButton>
      </li>
    </ul>
  </div>
</header>

<style>
  .navbar-element {
    @apply list-none;
  }
  .navbar-element a.active {
    @apply underline decoration-wavy decoration-2 underline-offset-8;
  }
</style>
