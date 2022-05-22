import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Flip from "react-reveal/Flip";
import { useSpring, animated, easings } from "@react-spring/web";

import $ from "../styles/global";
import useStore from "../store";
import Container from "../components/Container";
import SvgWrapper from "../components/SvgWrapper";
import ContactTl from "../assets/images/contact-tl.svg";
import ContactBr from "../assets/images/contact-br.svg";

const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(20px);
  }
  100% {
    transform: translateY(0);
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 85px);
  justify-content: center;
  align-items: center;
  width: 80%;
  margin-left: 10%;

  @media (min-width: ${$.screen.desktop}) {
    width: 70%;
  }
`;

const Title = styled.h1`
  width: 100%;
  text-align: left;
  padding: 0;
  margin: 0;
  margin-bottom: 30px;
`;

const IconsWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  /* height: 60%; */
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: ${$.screen.mobile}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 40%;
  }
`;

const Icon = styled(animated.button)`
  border: none;
  padding: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  max-width: 400px;
  height: 0; // Hacky way to get the div the same size as mask
  padding: 30px 0px;
  padding-bottom: 40%;

  background-image: url("https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2021%2F01%2F21%2Fhow-to-store-coffee-beans-FT-BLOG0121.jpg&q=60");

  background-size: 400% 400%;
  background-repeat: no-repeat;

  -webkit-mask-image: ${(props) => `url(${props.src})`};
  mask-image: ${(props) => `url(${props.src})`};
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  mask-size: contain;
  mask-position: center;

  transition: opacity 0.3s ease-in-out;

  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;

  @media (max-width: ${$.screen.mobile}) {
    width: 65%;
    height: 0; // Hacky way to get the div the same size as mask
    padding: 30px 0px;
    padding-bottom: 65%;
    margin-top: 40px;
  }

  :hover {
    cursor: pointer;
    animation: none;
    opacity: 0.6;
  }
`;

const Contact = (props) => {
  const [svgShown, setSvgShown] = useState([false, false]);

  const { scrollPos, mousePos } = useStore((state) => ({
    scrollPos: state.scrollPos,
    mousePos: state.mousePos,
  }));

  const { backgroundPosition } = useSpring({
    backgroundPosition: `
      ${(mousePos.x + 1) * 50}% ${(mousePos.y + 1) * 50}%
      `,
    delay: 100,
    config: {
      easing: easings.easeInOutCubic,
    },
  });

  useEffect(() => {
    if (scrollPos < 2.7) {
      setSvgShown([false, false]);
    } else if (scrollPos < 2.9) {
      setSvgShown([true, false]);
    } else if (scrollPos < 3.2) {
      setSvgShown([true, true]);
    } else if (scrollPos < 3.6) {
      setSvgShown([false, true]);
    } else {
      setSvgShown([false, false]);
    }
  }, [scrollPos]);

  return (
    <Container>
      <SvgWrapper top left>
        <Flip left duration={300} when={svgShown[0]}>
          <img src={ContactTl} />
        </Flip>
      </SvgWrapper>

      <SvgWrapper bottom right>
        <Flip right duration={300} when={svgShown[1]}>
          <img src={ContactBr} />
        </Flip>
      </SvgWrapper>

      <Wrapper>
        <Title>Contact</Title>

        <IconsWrapper>
          <Icon
            src={"/icons/linkedin.svg"}
            delay={0}
            onClick={() => {
              window.open("https://www.linkedin.com/in/glenda-txn/", "_blank");
            }}
            style={{
              backgroundPosition,
            }}
          />
          <Icon
            src={"/icons/github.svg"}
            delay={0.5}
            onClick={() => {
              window.open("https://github.com/gtxn", "_blank");
            }}
            style={{
              backgroundPosition,
            }}
          />
        </IconsWrapper>
      </Wrapper>
    </Container>
  );
};

export default Contact;
