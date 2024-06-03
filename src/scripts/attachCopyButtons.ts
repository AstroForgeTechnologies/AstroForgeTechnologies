/** Attaches copy buttons to code blocks in the document,
 * allowing users to copy code easily. */
function attachCopyButtons() {
  const copyButtonHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" class="fill-skin-base hover:fill-skin-accent opacity-0 group-hover:opacity-100 transition-all duration-[300ms] ease-in-out">
        <g>
          <path d="M184 72v144H40V72Z" opacity="0.2"/>
          <path d="M184 64H40a8 8 0 0 0-8 8v144a8 8 0 0 0 8 8h144a8 8 0 0 0 8-8V72a8 8 0 0 0-8-8m-8 144H48V80h128Zm48-168v144a8 8 0 0 1-16 0V48H72a8 8 0 0 1 0-16h144a8 8 0 0 1 8 8"/>
        </g>
      </svg>`;
  const codeBlocks = Array.from(document.querySelectorAll("pre"));

  for (const codeBlock of codeBlocks) {
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.className = "group";

    const copyButton = document.createElement("button");
    copyButton.className =
      "absolute right-0 top-0 rounded px-2 py-2 text-xs leading-4 text-skin-base font-medium flex";
    copyButton.innerHTML = copyButtonHTML;
    codeBlock.setAttribute("tabindex", "0");
    codeBlock.appendChild(copyButton);

    // wrap codebock with relative parent element
    codeBlock?.parentNode?.insertBefore(wrapper, codeBlock);
    wrapper.appendChild(codeBlock);

    copyButton.addEventListener("click", async () => {
      await copyCode(codeBlock, copyButton);
    });
  }

  async function copyCode(block: Element, button: Element) {
    const code = block.querySelector("code");
    const text = code?.innerText;

    await navigator.clipboard.writeText(text ?? "");

    // visual feedback that task is completed
    button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <path fill="#72CC50" d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59z" />
      </svg>
      `;

    setTimeout(() => {
      button.innerHTML = copyButtonHTML;
    }, 700);
  }
}
attachCopyButtons();
