<script lang="ts">
  import { Group, Material, Mesh } from "three";
  import { T } from "@threlte/core";
  import { type ThrelteGltf, useGltf } from "@threlte/extras";

  export const ref = new Group();

  const version = "0.2";

  const gltf = useGltf(`./assets/models/rocket-v${version}.glb`, {
    useDraco: "https://www.gstatic.com/draco/v1/decoders/",
  });

  let { ...props } = $props();

  /* Remove Solar Panels from Tone Mapping so they are Not a Beacon. */
  function getSolarPanelMaterial(
    gltf: ThrelteGltf<{
      nodes: Record<string, unknown>;
      materials: Record<string, unknown>;
    }>,
  ): Material {
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
