import styled from "styled-components";
import $ from "../styles/global";

const Container = styled.div`
  position: relative;
  height: 100vh;
  padding-left: 50px;
  padding-right: 50px;
  overflow: hidden;

  @media (max-width: ${$.screen.tablet}) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

export default Container;
