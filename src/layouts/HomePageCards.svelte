<script lang="ts">
  import CardContainer from "@components/CardContainer.svelte";
  import CardBody from "@components/CardBody.svelte";
  import CardItem from "@components/CardItem.svelte";
</script>

<CardContainer
  className="inter-var ease-linear"
  reducer={10}
>
  <CardBody
    className="relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black border-white/[0.2] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border transition-shadow duration-1000"
  >
    <CardItem translateZ="100" className="text-xl font-bold text-white">
      Make things float in air!!!
    </CardItem>
    <CardItem
      translateZ="75"
      className="text-sm max-w-sm mt-2 text-neutral-300"
      type="p"
    >
      Demo of Floating 3D Cards.
    </CardItem>
    <CardItem
      translateZ={50}
      className="w-full mt-4"
      type="button"
      onclick={() => alert("hi")}
    >
      <img
        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        height="1000"
        width="1000"
        alt="thumbnail"
      />
    </CardItem>
    <div class="mt-20 flex items-center justify-between">
      <CardItem
        type="button"
        translateZ={100}
        className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
        onclick={() => alert("Nope You Can't... Yet")}
      >
        Try Now →
      </CardItem>
      <CardItem
        translateZ={100}
        type="button"
        className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold"
        onclick={() => alert("Sign Up to What?")}
      >
        Sign Up Today!
      </CardItem>
    </div>
  </CardBody>
</CardContainer>
