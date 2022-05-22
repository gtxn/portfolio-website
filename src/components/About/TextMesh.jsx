import React, { useRef } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

import rubik from "../../assets/fonts/rubik-medium.json";

const TextMesh = ({
  text,
  color,
  radius,
  rotationY,
  amplitude,
  periodOfCircleCoeff,
  size,
}) => {
  const font = new FontLoader().parse(rubik);
  const textMesh = useRef();

  // Inline so canvas doesnt mess up text
  extend({ TextGeometry });

  useFrame(({ clock }) => {
    textMesh.current.geometry.center();
    textMesh.current.position.set(
      Math.sin(rotationY) * radius,
      Math.sin(clock.getElapsedTime() * periodOfCircleCoeff + rotationY) *
        amplitude,
      Math.cos(rotationY) * radius
    );
  });

  return (
    <mesh ref={textMesh} rotation={[0, rotationY, 0]}>
      <textGeometry args={[text, { font, size: size, height: 0.4 }]} />
      <meshNormalMaterial attach="material" color={color} />
    </mesh>
  );
};

export default TextMesh;
