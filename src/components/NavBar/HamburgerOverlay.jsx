import React from "react";
import styled from "styled-components";

import $ from "../../styles/global";
import CoffeeBean from "../../assets/images/coffee-bean.png";
import useStore from "../../store";

const Container = styled.div`
  width: 100%;
  height: fit-content;
  background-color: ${$.colors.primary[1]};
  position: fixed;
  top: 87px;
  z-index: 9;

  transform: ${(props) =>
    props.visible ? "translate3d(0, 0, 0)" : "translate3d(-150%, 0, 0)"};
  transition: all ${$.timings.fast};

  @media (min-width: ${$.screen.tablet}) {
    display: none;
  }
`;

const ListItem = styled.li`
  text-decoration: none;
  list-style-type: none;
  width: inherit;
  height: 50px;
  padding: 10px 10px;

  display: flex;
  align-items: center;
  z-index: 9;

  :not(:last-child) {
    border-bottom: 2px solid ${$.colors.brown[100]};
  }
`;

const NavBarButton = styled.button`
  height: 100%;
  border: none;
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
  justify-content: flex-start;

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
    transform: ${(props) =>
      props.isCurrentPage
        ? "translate3d(0, 0, 0)"
        : "translate3d(-150%, 0, 0);"};
  }

  :hover::after {
    transform: translate3d(0, 0, 0);
  }

  :hover {
    color: ${$.colors.brown[400]};
  }

  & > div {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    transform: ${(props) =>
      props.isCurrentPage
        ? "translate3d(0, 0, 0)"
        : "translate3d(0px, -100px, 0)"};
    transition: transform ${$.timings.standard};

    img {
      width: 25px;
      height: 25px;
    }
  }
`;

const HamburgerOverlay = ({ visible, setVisible }) => {
  const { pages, scrollPos } = useStore((state) => ({
    pages: state.pages,
    scrollPos: state.scrollPos,
  }));

  return (
    <Container visible={visible}>
      {Object.values(pages).map((page, i) => (
        <ListItem>
          <NavBarButton
            isCurrentPage={Math.round(scrollPos) === i}
            onClick={() => {
              window.scrollTo({
                top: i !== 0 ? i * window.innerHeight : 10,
                behavior: "smooth",
              });
              setVisible(false);
            }}
          >
            <div>
              <img src={CoffeeBean} alt="Coffee Bean" />
            </div>
            {page.title}
          </NavBarButton>
        </ListItem>
      ))}
    </Container>
  );
};

export default HamburgerOverlay;
