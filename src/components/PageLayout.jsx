import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  position: relative;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 100px;
`;

const PageLayout = ({ children }) => {
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
    </Container>
  );
};

export default PageLayout;
