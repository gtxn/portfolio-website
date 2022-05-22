import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, View } from "@react-three/drei";
import { Joystick } from "react-joystick-component";
import useStore from "./store";

import "./styles/fonts.css";
import $ from "./styles/global";
import getDeviceType from "./utils/getDeviceType";
import EntryModal from "./components/EntryModal";
import NavBar from "./components/NavBar";
import FloatingVerse from "./components/floatingVerse";
import NeonText from "./components/NeonText";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ContactForm from "./pages/Contact";

import Home from "./pages/Home";
import CupModel from "./components/Home/CupModel";
import TextCarousel from "./components/About/TextCarousel";

const Wrapper = styled.div`
  background-color: ${$.colors.brown[100]};
  opacity: ${(props) => (props.isEntryModalOpen ? 0.2 : 1)};
  transition: opacity ${$.timings.standard} ease-in;
  height: 400vh;

  ${(props) =>
    `* {
      font-family: rubik;
    }
    h1 {
      font-family: monoton;
      font-size: ${$.fontSize(props.windowWidth).header};
      color: ${$.colors.accent[3]};
      z-index: 2;
    }
    h2 {
      font-size: ${$.fontSize(props.windowWidth).subheader};
    }
    h3 {
      font-size: ${$.fontSize(props.windowWidth).standard};
    }
    p {
      font-size: ${$.fontSize(props.windowWidth).body};
    }
    button {
      font-size: ${$.fontSize(props.windowWidth).standard};
    }
  `}
`;

const Pages = styled.div`
  z-index: 0;
  *:not(div) {
    z-index: 2;
  }
`;

const StyledJoystickWrapper = styled.div`
  z-index: 9;
  position: fixed;
  bottom: 20px;
  right: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledMoveMeText = styled(NeonText)`
  font-size: ${$.fontSize().standard};
  color: ${$.colors.accent[3]};
  padding: 0px;
  margin: 0px;
  margin-bottom: 10px;
`;

function App() {
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(true);

  const setDeviceType = useStore((state) => state.setDeviceType);
  const setScrollPos = useStore((state) => state.setScrollPos);
  const setMousePos = useStore((state) => state.setMousePos);
  const setIsJoystickStopped = useStore((state) => state.setIsJoystickStopped);
  const setWindowWidth = useStore((state) => state.setWindowWidth);

  const main = useRef();
  const homeCanvasRef = useRef();
  const aboutCanvasRef = useRef();

  useEffect(() => {
    const device = getDeviceType();

    setDeviceType(device);

    window.addEventListener("scroll", () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;

      const scrollPos = winScroll / window.innerHeight;

      setScrollPos(scrollPos);
    });

    if (device === "desktop") {
      window.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        const mousePos = {
          x,
          y,
        };

        setMousePos(mousePos);
      });

      window.addEventListener("resize", () => {
        setWindowWidth(window.innerWidth);
      });
    }

    return () => {
      window.removeEventListener("scroll", () => {});
      window.removeEventListener("mousemove", (e) => {});
    };
  }, []);

  return (
    <main ref={main}>
      <EntryModal
        isVisible={isEntryModalOpen}
        setVisible={setIsEntryModalOpen}
      />
      <Wrapper
        isEntryModalOpen={isEntryModalOpen}
        deviceType={useStore((state) => state.deviceType)}
        windowWidth={useStore((state) => state.windowWidth)}
      >
        <NavBar />
        <FloatingVerse />

        <Pages>
          <Home canvasRef={homeCanvasRef} />
          <About canvasRef={aboutCanvasRef} />
          <Projects />
          <ContactForm />

          {useStore((state) => state.deviceType) !== "desktop" && (
            <StyledJoystickWrapper>
              <StyledMoveMeText color={$.colors.accent[2]}>
                Move me
              </StyledMoveMeText>
              <Joystick
                size={90}
                baseColor="rgba(0,0,0,0.2)"
                stickColor={$.colors.accent[1] + "bb"}
                move={({ x, y }) => {
                  setIsJoystickStopped(false);
                  setMousePos({
                    x: x / 50,
                    y: -y / 50,
                  });
                }}
                stop={() => {
                  setIsJoystickStopped(true);
                }}
              />
            </StyledJoystickWrapper>
          )}
        </Pages>
      </Wrapper>
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          zIndex: 1,
        }}
      >
        {/* Cup 3d model in homepage */}
        <View track={homeCanvasRef}>
          <PerspectiveCamera
            makeDefault
            position={[0, 4, 6]}
            rotation={[-Math.PI / 5, 0, 0]}
          />
          <ambientLight intensity={1} />
          <pointLight position={[2, 3, 3]} intensity={0.8} />
          <CupModel />
        </View>

        {/* About design in about page */}
        <View track={aboutCanvasRef}>
          <PerspectiveCamera makeDefault position={[0, 0, 15]} />

          <ambientLight intensity={1} />
          <TextCarousel
            wordList={[
              "React",
              "AWS",
              "React Native",
              "Git",
              "NodeJS",
              "Python",
              "Serverless",
            ]}
          />
        </View>
      </Canvas>
    </main>
  );
}

export default App;
