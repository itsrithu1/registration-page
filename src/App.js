import React from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './Register';
import Login from './SignIn';
import HomePage from './Homepage';
import { BrowserRouter, Route, Router, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/SignIn" replace={true} />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/SignIn' element={<Login />} Default/>
          <Route path='/HomePage' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
