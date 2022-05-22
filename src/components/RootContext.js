import React, { createContext } from "react";
import PropTypes from "prop-types";

const RootContext = createContext();

const Provider = ({ children, value }) => (
  <RootContext.Provider value={value}>{children}</RootContext.Provider>
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

export default RootContext;

export { Provider };
