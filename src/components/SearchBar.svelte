<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import PostCard from "@components/PostCard.svelte";
  import { slugifyStr } from "@utils/slugify.ts";
  import Fuse from "fuse.js";

  export type SearchItem = {
    title: string;
    description: string;
    data: CollectionEntry<"development">["data"];
    slug: string;
  };

  interface Props {
    searchList: SearchItem[];
  }

  interface SearchResult {
    item: SearchItem;
    refIndex: number;
  }

  let { searchList }: Props = $props();

  let inputValue = $state("");
  let searchResults: SearchResult[] = $state.frozen([]);
  let searchBar: HTMLInputElement;

  let fuse = $derived.by(() =>
    new Fuse(searchList, {
      keys: ["title", "description"],
      includeMatches: true,
      minMatchCharLength: 1,
      threshold: 0.5,
    })
  );

  $effect(() => {
    // if URL has search query,
    // insert that search query in input field
    const searchUrl = new URLSearchParams(window.location.search);
    const searchStr = searchUrl.get("q");
    if (searchStr) inputValue = searchStr;

    // put focus cursor at the end of the string
    setTimeout(() => {
      searchBar.selectionStart = searchBar.selectionEnd =
        searchStr?.length || 0;
    }, 50);
  })

  $effect(() => {
    // Add search result only if
    // input value is more than one character
    searchResults = inputValue.length > 0 ? fuse.search(inputValue) : [];

    // Update search string in URL
    let newRelativePathQuery = window.location.pathname;
    if (inputValue.length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("q", inputValue);
      newRelativePathQuery = window.location.pathname + "?" + searchParams.toString();
    }
    history.replaceState(history.state, "", newRelativePathQuery);
  })
</script>

<label class="relative block">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2 opacity-75">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path>
          </svg>
          <span class="sr-only">Search</span>
        </span>
  <input
    class="block w-full rounded border border-skin-fill
        border-opacity-40 bg-skin-fill py-3 pl-10
        pr-3 placeholder:italic placeholder:text-opacity-75
        focus:border-skin-accent focus:outline-none"
    placeholder="Search for anything..."
    bind:this={searchBar}
    type="text"
    name="search"
    bind:value={inputValue}
    autocomplete="off"
  />
</label>

{#if inputValue.length > 0}
  <div class="mt-8">
    Found {searchResults.length}
    {searchResults.length === 1
      ? " result"
      : " results"}{" "}
    for '{inputValue}'
  </div>
{/if}

<ul>
  {#if searchResults.length > 0}
    {#each searchResults as result}
      <PostCard
        href={`/development/${slugifyStr(result.item.slug)}/`}
        frontmatter={result.item.data}
        key={`${result.refIndex}-${result.item.slug}`}
      />
    ))}
    {/each}
  {/if}
</ul>
