import { Suspense } from "react";
import { Canvas, type Vector3 } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GltfModel from "@components/GltfModel.tsx";

export interface Props {
  modelPath: string;
  scale?: number;
  position?: Vector3;
}

const ModelViewer = ({
  modelPath,
  scale = 40,
  position = [0, 0, 0],
}: Props) => {
  return (
    <div className="py-20 flex items-center justify-center">
      <div
        className="flex items-center justify-center w-96 h-96 rounded-xl p-6"
        style={{ perspective: "1000px", backgroundColor: "black" }}
      >
        <Canvas camera={{ position: [2, 2, 4] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={5} />
          {/*<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={10} />*/}
          <pointLight position={[-2, 1.25, -2]} intensity={5} />
          <Suspense fallback={null}>
            <GltfModel
              modelPath={modelPath}
              scale={scale}
              position={position}
            />
            <OrbitControls />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default ModelViewer;
