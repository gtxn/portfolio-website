import React, { useEffect, useState } from "react";
import Rotate from "react-reveal/Rotate";
import styled, { keyframes } from "styled-components";

import useStore from "../store";
import $ from "../styles/global";
import Button from "../components/Button";
import Container from "../components/Container";
import NeonText from "../components/NeonText";
import SvgWrapper from "../components/SvgWrapper";
import HomeBl from "../assets/images/home-bl.svg";
import HomeTr from "../assets/images/home-tr.svg";

const HomeContainer = styled(Container)`
  position: relative;
  overflow: hidden;
`;

const Wrapper = styled.div`
  position: relative;
  height: calc(100% - 150px);
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: ${$.screen.tablet}) {
    height: calc(100% - 250px);
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: fit-content;
  /* border: 1px solid black; */

  h1 {
    margin: 0px;
  }

  h3 {
    font-weight: 400;
    width: 400px;
    color: ${$.colors.brown[500]};
    width: 100%;
  }
`;

const DownloadButton = styled(Button)`
  padding: 15px 20px;
  width: 100%;
  margin-top: 20px;
  color: ${$.colors.brown[700]};
`;

const RightPanel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  z-index: 2;

  @media (max-width: ${$.screen.tablet}) {
    width: 100%;
  }
`;

const arrow = keyframes`
  0% {opacity:0}
  40% {opacity:1}
  80% {opacity:0}
  100% {opacity:0}
`;

const ScrollDownWrapper = styled.div`
  position: absolute;
  right: 10px;
  bottom: 100px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: ${$.screen.tablet}) {
    position: absolute;
    left: calc(-100% + 70px);
    bottom: 100px;
  }

  @media (max-width: ${$.screen.mobile}) {
    display: none;
  }
`;

const ScrollDownText = styled(NeonText)`
  font-weight: 500;
  writing-mode: vertical-lr;
  text-orientation: upright;
  padding-bottom: 20px;
`;

const ScrollDownSvg = styled.svg`
  width: 40px;

  path {
    stroke: ${$.colors.accent[3]};
    fill: transparent;
    stroke-width: 5px;
    text-shadow: 0 0 1px #fff, 0 0 1px #fff, 0 0 1px #fff,
      0 0 2px ${$.colors.accent[2]}, 0 0 5px ${$.colors.accent[2]},
      0 0 8px ${$.colors.accent[2]}, 0 0 10px ${$.colors.accent[2]},
      0 0 13px ${$.colors.accent[2]};
    animation: ${arrow} 2s infinite;
    -webkit-animation: ${arrow} 2s infinite;

    :nth-child(1) {
      animation-delay: 0s;
      -webkit-animation-delay: 0s;
    }
    :nth-child(2) {
      animation-delay: 0.5s;
      -webkit-animation-delay: 0.5s;
    }
    :nth-child(3) {
      animation-delay: 1s;
      -webkit-animation-delay: 1s;
    }
  }
`;

const Home = ({ canvasRef }) => {
  const [svgShown, setSvgShown] = useState([true, true]);
  const scrollPos = useStore((state) => state.scrollPos);

  useEffect(() => {
    if (scrollPos < 0.2) {
      setSvgShown([true, true]);
    } else if (scrollPos < 0.6) {
      setSvgShown([false, true]);
    } else {
      setSvgShown([false, false]);
    }
  }, [scrollPos]);

  return (
    <HomeContainer>
      <ScrollDownWrapper>
        <ScrollDownText color={$.colors.accent[3]}>Scroll</ScrollDownText>
        <ScrollDownSvg viewBox="0 0 60 80">
          <path d="M0 0 L30 32 L60 0"></path>
          <path d="M0 20 L30 52 L60 20"></path>
          <path d="M0 40 L30 72 L60 40"></path>
        </ScrollDownSvg>
      </ScrollDownWrapper>

      <SvgWrapper top right>
        <Rotate top right when={svgShown[0]} duration={300}>
          <img src={HomeTr} />
        </Rotate>
      </SvgWrapper>

      <SvgWrapper bottom left>
        <Rotate top left when={svgShown[1]} duration={300}>
          <img src={HomeBl} />
        </Rotate>
      </SvgWrapper>

      <Wrapper>
        <LeftPanel>
          <h1>Hello,</h1>
          <h1>I'm Glenda</h1>
          <h3>Student + Software Developer + Coffee lover</h3>
          <DownloadButton
            onClick={() => {
              window.open("/Glenda_Teo_Resume.pdf", "_blank");
            }}
          >
            Download my resume
          </DownloadButton>
        </LeftPanel>

        <RightPanel ref={canvasRef} />
      </Wrapper>
    </HomeContainer>
  );
};

export default Home;
