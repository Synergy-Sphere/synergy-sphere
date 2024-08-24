import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
// import { div } from "three/examples/jsm/nodes/Nodes.js";
const Stars = (props) => {
  const ref = useRef();

  const sphere = random.inSphere(new Float32Array(5000), { radius: 1.2 });
useFrame((state, delta)=>{
  ref.current.rotation.x -= delta / 10
  ref.current.rotation.y -= delta / 15
})
  return (
    <group 
    rotation={[ 0, 0, Math.PI / 4]}
    >
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled
        {...props}
      >

        <PointMaterial 
        transparent 
        color="#F272C8"
        size={0.002}
        sizeAttenuation={true}
        depthWrite={false}
        />
      </Points>
    </group>
  );
};

function StarsCanvas() {
  return (
    <div className="w-full h-auto absolute inset-0 z-[0]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
export default StarsCanvas;
