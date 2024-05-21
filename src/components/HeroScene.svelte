<script lang="ts">
  import { T, useThrelte } from "@threlte/core";
  import { Environment, OrbitControls } from "@threlte/extras";
  import RocketV2Model from "@components/RocketV2Model.svelte";
  import { AmbientLight, PerspectiveCamera, Vector3 } from "three";
  import toRadians from "@utils/toRadians.ts";
  import envMap from "@assets/images/main/starmap_2020_4k_compressed.jpg";
  import { Sequence, Sheet, SheetObject } from "@threlte/theatre";

  const cameraLookAt = new Vector3(0, 0, 0);

  const { renderer, invalidate } = useThrelte();

  $effect(() => {
    renderer.toneMappingExposure = 5;
    invalidate();
  });
</script>

<Environment files={envMap.src} isBackground={false} />

<!-- Yes, this is cursed. Function Accepts V3 and not Array, Props accept Array and not V3. -->
<Sheet name="Cameras">
  <SheetObject key="Main Camera" let:Transform>
    <Sequence autoplay iterationCount={Infinity} />
    <Transform>
      <T
        is={PerspectiveCamera}
        makeDefault
        position={[-21, 3.5, -18]}
        on:create={({ ref }) => ref.lookAt(cameraLookAt)}
      >
        <OrbitControls target={cameraLookAt.toArray()} enableDamping />
      </T>
    </Transform>
  </SheetObject>
</Sheet>

<T is={AmbientLight} intensity={2} />

<Sheet name="Objects">
  <SheetObject key="Model" let:Transform>
    <Transform>
      <RocketV2Model scale={0.2} rotation={toRadians([0, 90, -45])}>
        {#snippet fallback()}
          <p>Loading...</p>
        {/snippet}
        {#snippet onError(error)}
          <p>Error Occurred! {error}</p>
        {/snippet}
      </RocketV2Model>
    </Transform>
  </SheetObject>
</Sheet>
