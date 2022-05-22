import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Fade from "react-reveal/Fade";

import $ from "../styles/global";
import Container from "../components/Container";
import ProjectCarousel from "../components/Projects/ProjectCarousel";
import Button from "../components/Button";
import SvgWrapper from "../components/SvgWrapper";
import ProjectBl from "../assets/images/project-bl.svg";
import ProjectTr from "../assets/images/project-tr.svg";
import useStore from "../store";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 4;

  h1 {
    align-self: flex-start;
  }
`;

const GithubButton = styled(Button)`
  width: 300px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

  a {
    color: ${$.colors.brown[700]};
    text-decoration: none;
  }

  @media (max-width: ${$.screen.mobile}) {
    background-color: ${$.colors.primary[1]};
    :hover {
      background-color: ${$.colors.primary[3]};
    }
  }

  @media (min-width: ${$.screen.desktop}) {
    margin-top: 20px;
    width: 350px;
    padding: 40px 0;
  }
`;

const Projects = (props) => {
  const [svgShown, setSvgShown] = useState([false, false]);
  const scrollPos = useStore((state) => state.scrollPos);

  useEffect(() => {
    if (scrollPos < 1.7) {
      setSvgShown([false, false]);
    } else if (scrollPos < 1.9) {
      setSvgShown([true, false]);
    } else if (scrollPos < 2.2) {
      setSvgShown([true, true]);
    } else if (scrollPos < 2.6) {
      setSvgShown([false, true]);
    } else {
      setSvgShown([false, false]);
    }
  }, [scrollPos]);

  return (
    <Container>
      <SvgWrapper top right>
        <Fade right duration={300} when={svgShown[0]}>
          <img src={ProjectTr} />
        </Fade>
      </SvgWrapper>
      <SvgWrapper bottom left>
        <Fade left duration={300} when={svgShown[1]}>
          <img src={ProjectBl} />
        </Fade>
      </SvgWrapper>

      <Wrapper>
        <h1>My Projects</h1>
        <ProjectCarousel />
        <GithubButton
          onClick={() => {
            window.open("https://github.com/gtxn?tab=repositories", "_blank");
          }}
        >
          View Github
        </GithubButton>
      </Wrapper>
    </Container>
  );
};

export default Projects;
