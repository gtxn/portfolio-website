import React, { useState } from "react";
import styled from "styled-components";

import $ from "../../styles/global";
import DesktopNav from "./DesktopNav";
import Hamburger from "../../assets/icons/hamburger.svg";
import HamburgerOverlay from "./HamburgerOverlay";

const StickyWrapper = styled.div`
  position: sticky;
  background-color: ${$.colors.brown[100]};
  top: 0;
  z-index: 5;
  padding: 0px 50px;

  @media (max-width: ${$.screen.mobile}) {
    padding: 0px;
  }
`;

const NavBarContainer = styled.nav`
  background-color: ${$.colors.brown[100]};
  z-index: 5;
  width: 100%;
  height: 85px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-bottom: 2px solid ${$.colors.brown[500]};
`;

const HamburgerImage = styled.button`
  margin-top: 20px;
  padding: 10px;
  border: none;
  border-radius: ${$.borderRadius.large};

  transition: all ${$.timings.standard};
  background-color: ${(props) =>
    props.isActive ? $.colors.primary[1] : "transparent"};

  img {
    width: 30px;
    height: 30px;
  }

  :hover {
    cursor: pointer;
    background-color: ${$.colors.primary[1]};
  }

  @media (min-width: ${$.screen.tablet}) {
    display: none;
  }
`;

const NavBar = () => {
  const [hamburgerOverlayVisible, setHamburgerOverlayVisible] = useState(false);

  return (
    <>
      <StickyWrapper>
        <NavBarContainer>
          <HamburgerImage
            onClick={() => {
              setHamburgerOverlayVisible(!hamburgerOverlayVisible);
            }}
            isActive={hamburgerOverlayVisible}
          >
            <img src={Hamburger} />
          </HamburgerImage>

          <DesktopNav />
        </NavBarContainer>
      </StickyWrapper>
      <HamburgerOverlay
        visible={hamburgerOverlayVisible}
        setVisible={setHamburgerOverlayVisible}
      />
    </>
  );
};

export default NavBar;
