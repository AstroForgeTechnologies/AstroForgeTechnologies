<script lang="ts">
  const headings = Array.from(document.querySelectorAll("h2, h3, h4, h5, h6"));
  for (const heading of headings) {
    // Attach Links to Headings in the Document allowing sharing of sections easily
    heading.classList.add("group");
    const link = document.createElement("a");
    link.innerText = "#";
    link.className =
      "heading-link opacity-0 group-hover:opacity-100 ml-2 transition-[opacity] ease-in-out duration-200";
    link.href = "#" + heading.id;
    link.ariaHidden = "true";
    heading.appendChild(link);

    // Create Relative Parent Wrapper Element
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.className = "group";

    // Create Anchor Element
    const anchor = document.createElement("div");
    anchor.className = "absolute -top-[150px]";

    // Wrap Header with Relative Parent Element
    heading.parentNode?.insertBefore(wrapper, heading);
    wrapper.appendChild(heading);
    wrapper.appendChild(anchor);
  }
</script>

<div class="flex max-w-32 items-start">
  <div class="sticky top-[150px]">
    <ul>
      <li></li>
    </ul>
  </div>
</div>
