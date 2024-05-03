<script lang="ts">
  import { T, useThrelte } from "@threlte/core";
  import { Environment, OrbitControls } from "@threlte/extras";
  import RocketV2Model from "@components/RocketV2Model.svelte";
  import { AmbientLight, PerspectiveCamera, Vector3 } from "three";
  import toRadians from "@utils/toRadians.ts";
  import envMap from "@assets/images/main/envMap.jpg";

  const cameraLookAt = new Vector3(-2.75, 0, 0);

  const { renderer, invalidate } = useThrelte();

  $effect(() => {
    renderer.toneMappingExposure = 10;
    invalidate();
  });
</script>

<Environment files={envMap.src} isBackground={true} />

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
  <p slot="fallback">Loading...</p>
  <p slot="error">Error Occurred!</p>
</RocketV2Model>
