import React from "react";
import styled from "styled-components";

import $ from "../../styles/global";
import LinkedInIcon from "../../assets/icons/linkedin.svg";
import GithubIcon from "../../assets/icons/github.svg";
import CoffeeBean from "../../assets/images/coffee-bean.png";
import useStore from "../../store";

const Routes = styled.div`
  max-width: 900px;
  width: 60%;
  height: 100%;
  display: flex;
  background-color: ${$.colors.brown[100]};
  position: relative;
  z-index: 9;
  justify-content: space-between;
  align-items: center;
  align-self: flex-start;

  @media (max-width: ${$.screen.tablet}) {
    width: 100%;
  }

  @media (max-width: ${$.screen.tablet}) {
    display: none;
  }
`;

const NavBarButton = styled.button`
  border: none;
  z-index: 9;
  background-color: transparent;
  font-size: ${$.fontSize().standard};
  font-weight: ${(props) => (props.isCurrentPage ? 600 : 400)};
  text-decoration: none;
  color: ${$.colors.brown[600]};
  overflow: hidden;
  position: relative;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all ${$.timings.fast};

  ::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 25px;
    width: calc(100% - 25px);
    height: 0.1em;
    background-color: ${(props) =>
      props.isCurrentPage ? $.colors.brown[600] : $.colors.brown[400]};
    transition: all ${$.timings.standard};
    transform: translate3d(-150%, 0, 0);
  }

  :hover::after {
    transform: translate3d(0, 0, 0);
  }

  :hover {
    color: ${$.colors.brown[400]};
  }

  & > div {
    height: 100%;
    width: inherit;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    transform: ${(props) =>
      props.isCurrentPage
        ? "translate3d(0, 0, 0)"
        : "translate3d(0px, -100px, 0)"};
    transition: all ${$.timings.fast};

    img {
      width: 25px;
      height: 25px;
    }
  }
`;

const Icons = styled.div`
  min-width: 200px;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  align-self: center;
`;

const IconButton = styled.a`
  width: 40px;

  & > img {
    width: 40px;
    transition: all ${$.timings.fast};

    :hover {
      cursor: pointer;
      filter: invert(64%) sepia(31%) saturate(310%) hue-rotate(4deg)
        brightness(93%) contrast(90%);
      opacity: 0.7;
    }
  }
`;

const DesktopNav = () => {
  const { scrollPos, pages } = useStore((state) => ({
    scrollPos: state.scrollPos,
    pages: state.pages,
  }));

  return (
    <>
      <Routes>
        {Object.values(pages).map((page, i) => (
          <NavBarButton
            isCurrentPage={Math.round(scrollPos) === i}
            onClick={() => {
              window.scrollTo({
                top: i !== 0 ? i * window.innerHeight : 50,
                behavior: "smooth",
              });
            }}
          >
            <div>
              <img src={CoffeeBean} alt="Coffee Bean" />
            </div>
            {page.title}
          </NavBarButton>
        ))}
      </Routes>

      <Icons>
        <IconButton href="https://www.linkedin.com/in/glenda-txn/">
          <img src={LinkedInIcon} alt="linkedin" />
        </IconButton>
        <IconButton href="https://github.com/gtxn">
          <img src={GithubIcon} alt="linkedin" />
        </IconButton>
      </Icons>
    </>
  );
};

export default DesktopNav;
