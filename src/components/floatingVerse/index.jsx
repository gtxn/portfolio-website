import React from "react";
import styled, { keyframes } from "styled-components";

import verses from "./verses.json";
import $ from "../../styles/global";

const colorMap = [
  $.colors.primary[1],
  $.colors.secondary[1],
  $.colors.accent[1],
];

const tickerAnimation = keyframes`
  0% {
    transform: translateX(0);
    -webkit-transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
  }
`;

const Wrapper = styled.div`
  position: fixed;
  top: 85px;
  left: 0;
  background-color: ${$.colors.brown[700] + "aa"};
  z-index: 6;
  width: 100%;
  padding-left: 100vw;
`;

const Ticker = styled.div`
  padding-right: 100vw;
  z-index: 6;

  overflow: hidden;

  white-space: nowrap;
  display: inline-block;
  box-sizing: content-box;

  transform: translateX(100%);

  animation: ${tickerAnimation} ${(props) => `${props.length * 10}s`} linear
    infinite;
`;

const VerseWrapper = styled.div`
  display: inline;
  width: 500px;
  padding: 0 2rem;

  & > * {
    display: inline-block;
    color: ${$.colors.brown[100]};

    & > span {
      font-weight: 600;
      color: ${(props) => colorMap[props.index]};
    }
  }
`;

const FloatingVerse = (props) => {
  return (
    <Wrapper>
      <Ticker length={verses.length}>
        {verses.map((verse, i) => (
          <VerseWrapper index={i % 3}>
            <p>
              <span>{verse.verse}</span> - {verse.body}
            </p>
          </VerseWrapper>
        ))}
      </Ticker>
    </Wrapper>
  );
};

export default FloatingVerse;
