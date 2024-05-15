<script lang="ts">
  import { T, useThrelte } from "@threlte/core";
  import { Environment, OrbitControls } from "@threlte/extras";
  import RocketV2Model from "@components/RocketV2Model.svelte";
  import { AmbientLight, PerspectiveCamera, Vector3 } from "three";
  import toRadians from "@utils/toRadians.ts";
  import type { ImageMetadata } from "astro";

  const cameraLookAt = new Vector3(0, 0, 0);

  const { renderer, invalidate } = useThrelte();

  interface Props {
    useEnvMapBackground?: boolean;
  }

  let { useEnvMapBackground = true }: Props = $props();

  $effect(() => {
    renderer.toneMappingExposure = 5;
    invalidate();
  });

  const origImgPath = useEnvMapBackground
    ? "/src/assets/images/main/starmap_2020_4k.jpg"
    : "/src/assets/images/main/starmap_2020_4k_compressed.jpg";

  let imgSrc = $state("");
  const images = import.meta.glob<{ default: ImageMetadata }>(
    "/src/assets/**/*.{jpeg,jpg,png,gif}",
  );
  if (!images[origImgPath])
    throw new Error(
      `"${origImgPath}" does not exist in glob: "/src/assets/*.{jpeg,jpg,png,gif}"`,
    );
  images[origImgPath]().then(meta => (imgSrc = meta.default.src));
</script>

{#if imgSrc}
  <Environment files={imgSrc} isBackground={useEnvMapBackground} />
{/if}

<!-- Yes, this is cursed. Function Accepts V3 and not Array, Props accept Array and not V3. -->
<T
  is={PerspectiveCamera}
  makeDefault
  position={[-21, 3.5, -18]}
  on:create={({ ref }) => ref.lookAt(cameraLookAt)}
>
  <OrbitControls target={cameraLookAt.toArray()} enableDamping />
</T>

<T is={AmbientLight} intensity={2} />

<RocketV2Model scale={0.2} rotation={toRadians([0, 90, -45])}>
  {#snippet fallback()}
    <p>Loading...</p>
  {/snippet}
  {#snippet onError(error)}
    <p>Error Occurred! {error}</p>
  {/snippet}
</RocketV2Model>
