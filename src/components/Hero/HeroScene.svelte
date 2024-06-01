<script lang="ts">
  import { T, useThrelte } from "@threlte/core";
  import { Environment } from "@threlte/extras";
  import { AmbientLight, PerspectiveCamera, Vector3 } from "three";
  import envMap from "@assets/images/main/starmap_2020_4k_compressed.jpg";
  import { SheetObject } from "@threlte/theatre";
  import ScrollSheet from "@components/Hero/ScrollSheet.svelte";
  import HeroModel from "@components/Hero/HeroModel.svelte";

  const cameraLookAt = new Vector3(0, 0, 0);

  const { renderer, invalidate } = useThrelte();

  $effect(() => {
    renderer.toneMappingExposure = 5;
    invalidate();
  });
</script>

<Environment files={envMap.src} isBackground={false} />

<ScrollSheet name="Cameras">
  <SheetObject key="Main Camera" let:Transform>
    <Transform>
      <T
        is={PerspectiveCamera}
        makeDefault
        position={[-21, 3.5, -18]}
        fov={50}
        on:create={({ ref }) => ref.lookAt(cameraLookAt)}
      >
        <!--<OrbitControls target={cameraLookAt.toArray()} enableDamping />-->
      </T>
    </Transform>
  </SheetObject>
</ScrollSheet>

<T is={AmbientLight} intensity={2} />

<ScrollSheet name="Main Model">
  <SheetObject key="Model" let:Transform let:Sync>
    <Transform>
      <HeroModel {Sync} scale={0.2} position={[0, 0, -1]} />
    </Transform>
  </SheetObject>
</ScrollSheet>

<ScrollSheet name="Secondary Model 1">
  <SheetObject key="Model" let:Transform let:Sync>
    <Transform>
      <HeroModel {Sync} scale={0.2} position={[0, 0, -1]} />
    </Transform>
  </SheetObject>
</ScrollSheet>

<ScrollSheet name="Secondary Model 2">
  <SheetObject key="Model" let:Transform let:Sync>
    <Transform>
      <HeroModel {Sync} scale={0.2} position={[0, 0, -1]} />
    </Transform>
  </SheetObject>
</ScrollSheet>
