import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const Earth = (props: JSX.IntrinsicElements["mesh"]) => {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });

  const gltf = useGLTF("/models/earth/scene.gltf");

  return (
    <>
      <primitive object={gltf.scene} ref={ref} {...props} />
    </>
  );
};

export default Earth;
