import React, { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Provider } from "./TextCarouselContext";

import useStore from "../../store";
import TextMesh from "./TextMesh";
import $ from "../../styles/global";

const periodOfCircleCoeff = 0.3;

const TextCarousel = ({ wordList }) => {
  const carousel = useRef();

  const mousePos = useRef(useStore((state) => state.mousePos));
  const radius = useRef();
  const amplitude = useRef();

  useEffect(
    () =>
      useStore.subscribe((state) => {
        mousePos.current = state.mousePos;

        if (window.innerWidth >= parseInt($.screen.desktop.slice(0, -2))) {
          radius.current = wordList.length * (mousePos.current.y + 1) * 0.5 + 8;
          amplitude.current = mousePos.current.x * radius.current;
        } else if (
          window.innerWidth >= parseInt($.screen.tablet.slice(0, -2))
        ) {
          radius.current =
            wordList.length * (mousePos.current.y + 1) * 1.4 + 20;
          amplitude.current = mousePos.current.x * radius.current * 0.6;
        } else {
          radius.current =
            wordList.length * (mousePos.current.y + 1) * 0.5 + 17;
          amplitude.current = mousePos.current.x * radius.current;
        }
      }),
    []
  );

  useFrame(({ clock }) => {
    carousel.current.rotation.set(
      0,
      clock.getElapsedTime() * periodOfCircleCoeff,
      0
    );
  });

  useThree(({ camera }) => {
    camera.position.set(0, 0, 30 + radius.current * 1.5);
  });

  return (
    <group ref={carousel} position={[0, 0, 0]}>
      {wordList.map((word, index) => {
        const rotationY = ((Math.PI * 2) / wordList.length) * index;

        return (
          <TextMesh
            text={word}
            color={$.colors.accent[1]}
            rotationY={rotationY}
            index={index}
            length={wordList.length}
            amplitude={amplitude.current}
            periodOfCircleCoeff={periodOfCircleCoeff}
            radius={radius.current}
            size={Math.max(radius.current * 0.15, 0.8)}
          />
        );
      })}
    </group>
  );
};

export default TextCarousel;
