import React, { useEffect, useRef } from "react";
import { useSpring, animated, CSS } from "@react-spring/web";
import styled, { css, keyframes } from "styled-components";

import $ from "../../styles/global";
import useStore from "../../store";

const colorMap = [
  $.colors.accent[2],
  $.colors.secondary[2],
  $.colors.primary[3],
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transform: perspective(100rem);
  transform: perspective(100rem);
`;

const shineAnimation = keyframes`
  0% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: 300px;
  height: 350px;
  margin-bottom: 10px;
  border-radius: ${$.borderRadius.large};
  overflow: hidden;
  padding: 0px 20px 10px 20px;
  box-shadow: ${$.boxShadow.standard};

  transition: all 0.2s;

  ${(props) =>
    !props.isShine &&
    css`
      border-top: 5px solid ${(props) => colorMap[props.index]};
    `};

  background-color: ${$.colors.brown[100]};

  :hover {
    transform: translate3d(-10px, -10px, 0px);
    box-shadow: ${$.boxShadow.hover};
  }

  @media screen and (min-width: ${$.screen.desktop}) {
    width: 380px;
    height: 400px;
  }
`;

const ShinyGradient = styled.div`
  position: absolute;
  top: 0;
  left: -20px;
  width: calc(100% + 40px);
  z-index: 0;
  height: 100%;
  background: linear-gradient(
    to bottom right,
    ${$.colors.accent[1] + "88"},
    ${$.colors.primary[1] + "88"},
    ${$.colors.secondary[1] + "88"},
    ${$.colors.accent[1] + "88"},
    ${$.colors.primary[1] + "88"},
    ${$.colors.secondary[1] + "88"},
    ${$.colors.accent[1] + "88"}
  );
  background-size: 200% 200%;
  -webkit-animation: ${shineAnimation} 6s linear infinite;
`;

const Overlay = styled.button`
  position: absolute;
  top: 0;
  left: -0px;
  width: calc(100%);
  height: calc(100% + 40px);
  border-radius: ${$.borderRadius.large};

  text-decoration: none;

  background-color: ${(props) => colorMap[props.index]};
  opacity: 0;
  z-index: 9;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  transition: opacity ${$.timings.fast};

  :hover {
    opacity: 1;
    cursor: pointer;
  }

  h3 {
    color: ${$.colors.brown[100]};
  }
`;

const CardBody = styled.div`
  position: relative;
  z-index: 1;
  * {
    z-index: 1;
  }
`;

const Header = styled.div`
  padding-top: 20px;
`;

const Badge = styled.div`
  width: fit-content;
  background-color: ${(props) => colorMap[props.index]};
  padding: 5px 20px;
  border-radius: 5px;

  & > p {
    font-size: ${$.fontSize(window.innerWidth).body};
    color: ${$.colors.brown[100]};
    padding: 0px;
    margin: 0px;
  }

  ${(props) =>
    props.isShine &&
    css`
      background-color: ${$.colors.brown[700] + "dd"};
      font-weight: 700;
      padding: 5px 30px;
    `}
`;

const TitleWrapper = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  padding: 0px;
  font-weight: 600;
  color: ${(props) => colorMap[props.index]};

  ${(props) =>
    props.isShine &&
    css`
      color: ${$.colors.brown[700]};
      background-color: #fff5;
    `}
`;

const ProjectCard = ({ title, index, badge, body, link }) => {
  const isJoystickStopped = useStore((state) => state.isJoystickStopped);
  const mousePos = useStore((state) => state.mousePos);

  const cardRef = useRef();

  const { rotateX, rotateY } = useSpring({
    rotateX: isJoystickStopped ? 0 : -mousePos.y * 15,
    rotateY: isJoystickStopped ? 0 : mousePos.x * 15,
    config: {
      mass: 1,
      tension: 200,
      friction: 20,
    },
  });

  return (
    <Container>
      <animated.div
        style={{
          rotateX,
          rotateY,
        }}
      >
        <Wrapper index={index} ref={cardRef} isShine={badge === "HACKATHON"}>
          {badge === "HACKATHON" && <ShinyGradient />}
          <Overlay
            index={index}
            onClick={() => {
              window.open(link, "_blank");
            }}
          >
            <h3>Click here for more</h3>
          </Overlay>

          <CardBody>
            <Header>
              <Badge index={index} isShine={badge === "HACKATHON"}>
                <p>{badge}</p>
              </Badge>

              <TitleWrapper>
                <Title index={index} isShine={badge === "HACKATHON"}>
                  <h3>{title}</h3>
                </Title>
              </TitleWrapper>
            </Header>

            <p>{body}</p>
          </CardBody>
        </Wrapper>
      </animated.div>
    </Container>
  );
};

export default ProjectCard;
