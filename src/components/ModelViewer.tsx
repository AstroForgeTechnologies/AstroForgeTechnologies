import { Suspense } from "react";
import { Canvas, type Vector3 } from "@react-three/fiber";
import { Html, OrbitControls, useProgress } from "@react-three/drei";
import GltfModel from "@components/GltfModel.tsx";

export interface Props {
  modelPath: string;
  scale?: number;
  position?: Vector3;
}

const Loader = () => {
  const { progress } = useProgress();
  return <Html center>{progress}% Loaded...</Html>;
};

const ModelViewer = ({
  modelPath,
  scale = 40,
  position = [0, 0, 0],
}: Props) => {
  return (
    <div className="flex items-center justify-center py-20">
      <div
        className="flex h-96 w-96 items-center justify-center rounded-xl p-6"
        style={{ perspective: "1000px", backgroundColor: "black" }}
      >
        <Canvas camera={{ position: [2, 2, 4] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={5} />
          {/*<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={10} />*/}
          <pointLight position={[-2, 1.25, -2]} intensity={5} />
          <Suspense fallback={<Loader />}>
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
