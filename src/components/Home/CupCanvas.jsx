import React, { useContext } from "react";
import styled from "styled-components";
import { View } from "@react-three/drei";

import RootContext from "../RootContext";
import CupModel from "./CupModel";

const CupCanvas = ({ scrollPos, tracker }) => {
  return (
    <View track={tracker}>
      <color attach="background" args={["black"]} />

      <ambientLight intensity={1} />
      <pointLight position={[2, 3, 3]} intensity={0.8} />
      <CupModel scrollPos={scrollPos} />
    </View>
  );
};

export default CupCanvas;
