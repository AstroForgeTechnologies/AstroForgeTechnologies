<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    href: string;
    children: Snippet;
    className?: string;
    ariaLabel?: string;
    title?: string;
    disabled?: boolean;
  }

  let {
    href,
    className,
    ariaLabel,
    title,
    disabled = false,
    children,
  }: Props = $props();
</script>

{#if disabled}
  <span
    class={`group inline-block ${className}`}
    aria-label={ariaLabel}
    {title}
    aria-disabled={disabled}
  >
    {@render children()}
  </span>
{:else}
  <a
    {href}
    class={`group inline-block hover:text-skin-accent ${className}`}
    aria-label={ariaLabel}
    {title}
  >
    {@render children()}
  </a>
{/if}
