import React from "react";
import styled, { css, keyframes } from "styled-components";

import useStore from "../store";
import $ from "../styles/global";
import NeonText from "./NeonText";

// Animations
const swingIn = keyframes`
  0% {
    display: none;
    transform: translate3D(-200%, -100%, 0) rotateZ(45deg);
  }
  100% {
    transform: translate3D(0, 0, 0) rotateZ(0deg);
    display: block;
  }
`;

const swingOut = keyframes`
  0% {
    transform: translate3D(0, 0, 0) rotateZ(0deg);
  }
  100% {
    transform: translate3D(-200%, -100%, 0) rotateZ(45deg);
    display: none;
  }
`;

// Styled components
const Container = styled.div`
  position: fixed;
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  z-index: ${(props) => (props.isVisible ? "9" : "-1")};
`;

const Wrapper = styled.div`
  position: fixed;
  width: 80%;
  max-width: 500px;
  background-color: ${$.colors.brown[700]};
  padding: 10px 10px;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  box-shadow: 4px 4px 4px 2px ${$.colors.brown[700]};

  ${(props) =>
    props.isVisible
      ? css`
          animation: ${swingIn} 0.5s ease-in-out forwards;
        `
      : css`
          animation: ${swingOut} 0.5s ease-in-out forwards;
        `}

  :after {
    content: "";
    z-index: -1;
    position: absolute;
    top: -50vh;
    left: 10%;
    width: 80%;
    height: 50vh;
    border-left: 2px solid ${$.colors.brown[600]};
    border-right: 2px solid ${$.colors.brown[600]};
  }
`;

const Border = styled.div`
  border: 2px solid ${$.colors.brown[100]};
  padding: 20px 20px;
`;

const ModalTitle = styled(NeonText)`
  color: ${$.colors.primary[2]};
  font-family: monoton;
  font-size: 50px;
  padding: 0px 0px;
  margin: 0px;
  margin-bottom: 20px;
  font-weight: 700;
`;

const TextBody = styled.p`
  line-height: 2;
  color: ${$.colors.brown[100]};
`;

const AcknowledgeButton = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  border-radius: ${$.borderRadius.standard};
  background-color: ${$.colors.secondary[2]};
  width: 100%;
  color: ${$.colors.brown[100]};
  font-weight: 600;
  font-size: ${$.fontSize().body};
  transition: all ${$.timings.fast};

  :hover {
    cursor: pointer;
    opacity: 0.8;
    box-shadow: 1px 1px 2px 2px gray;
    transform: translate3d(-1px, -1px, 0);
  }
`;

const modalText = {
  touchScreen: `Hey there! I noticed you're using a touch screen device. While this website still works, some cool stuff (really cool ;D) will only work on a desktop or laptop.
    If possible, use a desktop or laptop to view this website for the best experience ☕`,
  desktop: `Hello fellow desktop user! Because you're on a desktop, you can view this website and enjoy it's FULL FUNCTIONALITY :D Feel free to move your mouse around to view
    the cool stuff that's on the website 🥳`,
};

const EntryModal = ({ isVisible, setVisible }) => {
  const deviceType = useStore((state) => state.deviceType);

  return (
    <Container isVisible={isVisible}>
      <Wrapper isVisible={isVisible}>
        <Border>
          <ModalTitle color={$.colors.primary[1]}>We are open!</ModalTitle>
          <TextBody>
            {deviceType === "mobile" || deviceType === "tablet"
              ? modalText.touchScreen
              : modalText.desktop}
          </TextBody>

          <AcknowledgeButton
            onClick={() => {
              setVisible(false);
            }}
            deviceType={deviceType}
          >
            Okay, I got it!
          </AcknowledgeButton>
        </Border>
      </Wrapper>
    </Container>
  );
};

export default EntryModal;
