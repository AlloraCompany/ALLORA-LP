import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { HTMLMesh } from "three/examples/jsm/Addons.js";

const Asterist3d = () => {
  const svgData = useLoader(SVGLoader, "/asterist.svg");

  const shapes = svgData.paths.flatMap((path) => path.toShapes(true));

  const geometry = new THREE.ExtrudeGeometry(shapes, {
    depth: 30,
    bevelEnabled: true,
    bevelSize: 4,
    bevelThickness: 1,
    bevelOffset: -2,
    bevelSegments: 10,
  });
  geometry.center();

  const meshRef = useRef<HTMLMesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.8;
  });
  // useFrame((state, delta) => (meshRef.current.rotation.x += delta * 0.1));

  return (
    <mesh ref={meshRef} geometry={geometry} scale={0.5} rotateY={10}>
      <meshPhongMaterial attach="material" color="#f60" />
    </mesh>
  );
};

export const AsteristCanvas = () => {
  return (
    <Canvas
      className="w-full h-full max-h-[80svh] mx-auto block"
      camera={{ position: [0, 0, 120] }}
    >
      {/* <OrbitControls enablePan={true} /> */}
      <ambientLight intensity={1} />
      <directionalLight position={[500, 500, 500]} intensity={1} />
      {/* <fog attach="fog" args={["#f60", 2, 10]} /> */}
      <Asterist3d />
    </Canvas>
  );
};

// export default Asterist3d;
