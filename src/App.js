import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import NavSide from './component/home'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavSide />
      </div>
    </BrowserRouter>
  );
}

export default App;
