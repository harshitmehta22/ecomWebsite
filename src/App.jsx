import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';


const App = () => {
  return (
   <>
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
