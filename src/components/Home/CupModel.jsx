import React, { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

import useStore from "../../store";

const CupModel = (props) => {
  const { nodes, materials } = useGLTF("/models/cup.gltf");

  const group = useRef();

  const scrollPos = useRef(useStore.getState().scrollPos);
  const mousePos = useRef(useStore.getState().mousePos);

  useEffect(
    () =>
      useStore.subscribe((state) => {
        scrollPos.current = state.scrollPos;
        mousePos.current = state.mousePos;
      }),
    []
  );

  useFrame(({ clock }) => {
    group.current.rotation.set(
      scrollPos.current * Math.PI,
      clock.getElapsedTime() * 0.3,
      0
    );

    group.current.position.set(
      mousePos.current.x * 0.3,
      0,
      mousePos.current.y * 0.5
    );
  });

  return (
    <group ref={group} {...props}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere.geometry}
        material={materials["Material.003"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath.geometry}
        material={materials.Material}
      />
    </group>
  );
};

useGLTF.preload("/models/cup.gltf");

export default CupModel;
