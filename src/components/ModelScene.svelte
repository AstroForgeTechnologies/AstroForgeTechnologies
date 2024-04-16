<script lang="ts">
  import { T } from "@threlte/core";
  import { OrbitControls, Sky, Stars } from "@threlte/extras";
  import RocketV2Model from "@components/RocketV2Model.svelte";
  import { PerspectiveCamera, Vector3 } from "three";
  import toRadians from "@utils/toRadians.ts";

  const cameraLookAt = new Vector3(-1.5, 0, 0);
</script>

<!-- Yes, this is cursed. Function Accepts V3 and not Array, Props accept Array and not V3. -->
<T
  is={PerspectiveCamera}
  makeDefault
  position={[-3, 5, 30]}
  on:create={({ ref }) => ref.lookAt(cameraLookAt)}
>
  <OrbitControls target={cameraLookAt.toArray()} />
</T>

<Sky elevation={0.5} />

<Stars />

<RocketV2Model scale={0.2} rotation={toRadians([0, 135, -45])}>
  <p slot="fallback">Loading...</p>
  <p slot="error">Error Occurred!</p>
</RocketV2Model>
