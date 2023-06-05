import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

const INITIAL_STATE = {};

function MyProvider({ children }) {
  const [state, setState] = useState(INITIAL_STATE);

  return (
    <MyContext.Provider value={ state }>
      { children }
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.element,
}.isRequired;

export default MyProvider;
