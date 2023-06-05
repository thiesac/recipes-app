import React from 'react';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyProvider from './context/MyProvider';

function App() {
  return (
    <div className="meals">
      <MyProvider>
        <span className="logo">TRYBE</span>
        <object
          className="rocksGlass"
          type="image/svg+xml"
          data={ rockGlass }
        >
          Glass
        </object>
      </MyProvider>
    </div>
  );
}

export default App;
