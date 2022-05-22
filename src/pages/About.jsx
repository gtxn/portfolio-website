import React, { useEffect, useState } from "react";
import Roll from "react-reveal/Roll";
import styled from "styled-components";

import $ from "../styles/global";
import Container from "../components/Container";
import SvgWrapper from "../components/SvgWrapper";
import AboutBr from "../assets/images/about-br.svg";
import AboutTl from "../assets/images/about-tl.svg";
import useStore from "../store";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  align-items: center;

  max-height: 100vh;
  width: auto;

  @media (min-width: ${$.screen.desktop}) {
    height: calc(100% - 150px);
    flex-direction: row;
  }
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 60%;

  h1 {
    margin: 0px;
  }

  p {
    font-weight: 400;
    line-height: 1.5em;
    width: 400px;
    color: ${$.colors.brown[600]};
    width: 100%;
    font-size: ${$.fontSize().body};
  }

  @media (max-width: ${$.screen.desktop}) {
    width: 90%;
  }
`;

const RightPanel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;

  @media (max-width: ${$.screen.desktop}) {
    width: 100%;
  }
`;

const About = ({ canvasRef }) => {
  const [svgShown, setSvgShown] = useState([false, false]);

  const scrollPos = useStore((state) => state.scrollPos);
  const deviceType = useStore((state) => state.deviceType);

  useEffect(() => {
    if (scrollPos < 0.7) {
      setSvgShown([false, false]);
    } else if (scrollPos < 0.9) {
      setSvgShown([true, false]);
    } else if (scrollPos < 1.2) {
      setSvgShown([true, true]);
    } else if (scrollPos < 1.6) {
      setSvgShown([false, true]);
    } else {
      setSvgShown([false, false]);
    }
  }, [scrollPos]);

  return (
    <Container>
      <SvgWrapper top left>
        <Roll top left when={svgShown[0]} duration={500}>
          <img src={AboutTl} />
        </Roll>
      </SvgWrapper>

      <SvgWrapper bottom right>
        <Roll top right when={svgShown[1]} duration={500}>
          <img src={AboutBr} />
        </Roll>
      </SvgWrapper>

      <Wrapper>
        <LeftPanel>
          <h1>Coffee, Tea, or me?</h1>

          {deviceType !== "mobile" ? (
            <>
              <p>
                Hi! I'm Glenda, an incoming computer science student at the
                University of Cambridge, and hackathon enthusiast. With other
                like-minded buddies, I have won 5 hackathons and also been a
                mentor to other aspiring young hackers at SGCodeCampus.
                Skill-wise, I am AWS DVA certified, and comfortable with both
                front-end and back-end development with React, Node, and Python.
              </p>
              <p>
                Coding is my absolute passion. Seeing how it empowers us to
                build things that could change the world is an extremely
                appealing concept. Everyday, I thank God for finding my purpose
                and being able to have a career that I know I'll love and enjoy.
                My ultimate goal is to use tech to do good to be a blessing in
                the lives of others💖
              </p>
            </>
          ) : (
            <>
              <p>
                Hi! I'm Glenda, an incoming computer science student at the
                University of Cambridge, and hackathon enthusiast. With other
                like-minded buddies, I have won 5 hackathons and also been a
                mentor to other aspiring young hackers. Everyday, I thank God
                for finding my purpose and being able to have a career that I
                know I'll love and enjoy. My ultimate goal is to use tech to do
                good to be a blessing in the lives of others💖
              </p>
            </>
          )}
        </LeftPanel>

        <RightPanel ref={canvasRef} />
      </Wrapper>
    </Container>
  );
};

export default About;
