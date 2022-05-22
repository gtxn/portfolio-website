import styled from "styled-components";

import $ from "../styles/global";

const Button = styled.button`
  display: flex;
  font-size: ${$.fontSize().standard};
  justify-content: center;
  align-items: center;
  background-color: ${$.colors.primary[2]};
  border: 0;
  border-radius: ${$.borderRadius.standard};
  box-shadow: ${$.boxShadow.standard};
  padding: 20px 30px;
  font-weight: 500;
  transition: all ${$.timings.fast};
  color: ${$.colors.brown[700]};

  :hover {
    cursor: pointer;
    background-color: ${$.colors.primary[1]};
    color: ${$.colors.brown[600]};
    opacity: 0.7;
    transform: translate(-3px, -3px);
  }
`;

export default Button;
