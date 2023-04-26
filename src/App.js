import React from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './Register';
import Login from './SignIn';
import HomePage from './Homepage';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

function App() {
  return (
    <main className="App">
     {/* <Routes>
        <Route path='/' element={<Register/>} />
        <Route path='/SignIn' element={<Login/>} />
        {/* <Route path='/HomePage' element={<HomePage/>} /> */}
      {/*</Routes> */}
{/* 
      <BrowserRouter>
        <Routes>
          <Route path='/' component={<Register/>} />
          <Route path='/SignIn' component={<Login/>} />
          <Route path='/HomePage' component={<HomePage/>} />
        </Routes>
      </BrowserRouter> */}
{/* 
      <React.Fragment>

        <Router>
          <Routes>
            <Route path='/' element={<HomePage />}/>
          </Routes>
        </Router>

      </React.Fragment>
   <Register/> */}
   <Login/>
   <Routes>
    <Route path='/Register' element={<Register />}/>

   </Routes>
    </main>
  );
}

export default App;
