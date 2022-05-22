import styled, { keyframes, css } from "styled-components";

const flicker = (color) => keyframes`
  0%, 18%, 22%, 25%, 53%, 57%, 100% {
    text-shadow: 0 0 1px #fff, 0 0 1px #fff, 0 0 1px #fff,
      0 0 2px ${color}, 0 0 5px ${color}, 0 0 8px ${color},
      0 0 10px ${color}, 0 0 13px ${color};
    transition: all 0.2s;
  }
  20%, 24%, 55% {       
    text-shadow: none;
  }
`;

const NeonText = styled.h5`
  ${(props) => css`
    text-shadow: 0 0 1px #fff, 0 0 1px #fff, 0 0 1px #fff,
      0 0 2px ${props.color}, 0 0 5px ${props.color}, 0 0 8px ${props.color},
      0 0 10px ${props.color}, 0 0 13px ${props.color};
    transition: all 0.2s;
  `}
  animation: ${(props) => flicker(props.color)} 10s infinite;
  padding: 0px 0px;
`;

export default NeonText;
