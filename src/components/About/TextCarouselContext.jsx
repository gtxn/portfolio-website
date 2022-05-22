import React, { createContext } from "react";
import PropTypes from "prop-types";

const TextCarouselContext = createContext();

const Provider = ({ children, value }) => (
  <TextCarouselContext.Provider value={value}>
    {children}
  </TextCarouselContext.Provider>
);

Provider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
};

export default TextCarouselContext;

export { Provider };
