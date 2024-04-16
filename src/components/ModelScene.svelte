<script lang="ts">
  import { T } from "@threlte/core";
  import { OrbitControls, Sky, Stars } from "@threlte/extras";
  import RocketV1Model from "@components/RocketV1Model.svelte";
  import { HemisphereLight, PerspectiveCamera } from "three";
</script>

<T
  is={PerspectiveCamera}
  makeDefault
  position={[10, 10, 10]}
  on:create={({ ref }) => {
    ref.lookAt(0, 1, 0);
  }}
>
  <OrbitControls />
</T>

<Sky elevation={0.5} />

<Stars />

<T is={HemisphereLight} intensity={2.5} />

<RocketV1Model position={[0, 0, 10]} scale={0.2}>
  <p slot="fallback">Loading...</p>
  <p slot="error">Error Occurred!</p>
</RocketV1Model>
