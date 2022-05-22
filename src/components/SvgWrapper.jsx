import styled from "styled-components";
import $ from "../styles/global";

const SvgWrapper = styled.div`
  max-width: 90%;
  max-height: 30%;
  position: absolute;
  z-index: 0;
  ${(props) => props.top && `top: 0;`};
  ${(props) => props.bottom && `bottom: 0;`};
  ${(props) => props.left && `left: 0;`};
  ${(props) => props.right && `right: 0;`};

  @media (min-width: ${$.screen.tablet}) {
    max-width: 70%;
  }
  @media (min-width: ${$.screen.desktop}) {
    max-width: 50%;
  }
`;

export default SvgWrapper;
