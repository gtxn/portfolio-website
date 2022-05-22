import React from "react";
import styled from "styled-components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import ProjectCard from "./ProjectCard";
import projectList from "./projectList.json";

const CarouselWrap = styled.div`
  height: 450px;
  width: calc(100% + 40px);
`;

const ProjectCarousel = () => {
  const responsive = {
    large: {
      breakpoint: {
        max: 3000,
        min: 1200,
      },
      items: 3,
    },
    medium: {
      breakpoint: {
        max: 1200,
        min: 800,
      },
      items: 2,
    },
    small: {
      breakpoint: {
        max: 800,
        min: 0,
      },
      items: 1,
    },
  };

  return (
    <CarouselWrap>
      <Carousel
        infinite
        autoPlay={true}
        autoPlaySpeed={20000}
        responsive={responsive}
        ssr={true}
        showDots={true}
      >
        {projectList.map((project, index) => (
          <ProjectCard
            {...Object.assign({ ...project }, { index: index % 3 })}
            key={`carousel-item-${index}`}
          />
        ))}
      </Carousel>
    </CarouselWrap>
  );
};

export default ProjectCarousel;
