<script lang="ts">
  import { LOCALE } from "@config";
  import cn from "@utils/cn.ts";

  interface DateTimeSpec {
    dateTime: string | Date | undefined | null;
  }

  interface Props extends DateTimeSpec {
    category?: "Published" | "Updated" | "Originally Published";
    size?: "sm" | "lg";
    className?: string;
  }

  let { dateTime, category = "Published", size = "sm", className }: Props = $props();

  // Must do this, as using datetime props always errors if not accept undefined/null
  if (!dateTime)
    throw new Error("DateTime is Required!");

  const dateObj = new Date(dateTime);

  const date = dateObj.toLocaleDateString(LOCALE.langTag, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const time = dateObj.toLocaleTimeString(LOCALE.langTag, {
    hour: "2-digit",
    minute: "2-digit",
  });
</script>

<div class={cn("flex items-center space-x-2 opacity-80", className)}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class={`${
          size === "sm" ? "scale-90" : "scale-100"
        } inline-block h-6 w-6 min-w-[1.375rem] fill-skin-base`}
    aria-hidden="true"
  >
    <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z" />
    <path
      d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"
    />
  </svg>

  {#if category === "Published"}
    <span class="sr-only">
      {category}
    </span>
  {:else}
    <span class={`italic ${size === "sm" ? "text-sm" : "text-base"}`}>
      {category}
    </span>
  {/if}

  <span class={`italic ${size === "sm" ? "text-sm" : "text-base"}`}>
    <time dateTime={dateObj.toISOString()}>{date}</time>
    <span aria-hidden="true"> | </span>
    <span class="sr-only">&nbsp;at&nbsp;</span>
    <span class="text-nowrap">{time}</span>
  </span>
</div>
