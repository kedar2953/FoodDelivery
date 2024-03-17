import React from 'react'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import { NavLink,Routes,Route } from "react-router-dom";
import Login from './Pages/Login';
import './styles.css'
import Signup from './Pages/Signup'
import CartProvider from '../src/Components/ContextReducer';
import MyOrder from './Pages/MyOrder';
function App() {
  return (
    <div>
    <CartProvider>
      <Routes>
        <Route path='/' index element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/myOrder' element={<MyOrder/>}></Route>
      </Routes>
    </CartProvider>
    
      
    </div>
    
  )

}

export default App
