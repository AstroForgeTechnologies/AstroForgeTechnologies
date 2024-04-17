<script lang="ts">
  import { Group, Material, Mesh } from "three";
  import { T } from "@threlte/core";
  import { GLTF, useGltf } from "@threlte/extras";
  import type * as THREE from "three";

  export const ref = new Group();

  const version = "0.2";

  type Model = {
    nodes: {
      Body1: THREE.Mesh;
      Body2_1: THREE.Mesh;
      Body2_2: THREE.Mesh;
    };
    materials: {
      Steel: THREE.MeshStandardMaterial;
      ["Titanium -  Pure"]: THREE.MeshStandardMaterial;
      ["Solar Panel Lo Res"]: THREE.MeshStandardMaterial;
    };
  };

  const gltf = useGltf<Model>(`./assets/models/rocket-v${version}.glb`, {
    useDraco: "https://www.gstatic.com/draco/v1/decoders/",
  });

  let { ...props } = $props();

  /* Remove Solar Panels from Tone Mapping so they are Not a Beacon. */
  function getSolarPanelMaterial(gltf: GLTF & Model): Material {
    gltf.materials["Solar Panel Lo Res"].toneMapped = false;
    return gltf.materials["Solar Panel Lo Res"];
  }
</script>

<T is={ref} dispose={false} {...props}>
  {#await gltf}
    <slot name="fallback" />
  {:then gltf}
    <T is={Group} position={[0, 0, 50]} scale={0.01}>
      <T
        is={Mesh}
        geometry={gltf.nodes.Body1.geometry}
        material={gltf.materials.Steel}
      />
      <T is={Group}>
        <T
          is={Mesh}
          geometry={gltf.nodes.Body2_1.geometry}
          material={gltf.materials["Titanium -  Pure"]}
        />
        <T
          is={Mesh}
          geometry={gltf.nodes.Body2_2.geometry}
          material={getSolarPanelMaterial(gltf)}
        />
      </T>
    </T>
  {:catch error}
    <slot name="error" {error} />
  {/await}

  <slot {ref} />
</T>
