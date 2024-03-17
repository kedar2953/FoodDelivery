import React, { useState } from 'react'
import { NavLink,Routes,Route, useNavigate } from "react-router-dom";
import Home from '../Pages/Home'
import Login from '../Pages/Login';
import "./kedar.css"
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartProvider, { useCart } from './ContextReducer';
import Modal from '../Modal'
import Cart from '../Pages/Cart'
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 1px',
    },
  }));
function Navbar() {
    const [cartView,setCartView]=useState(false);
    const navigate=useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem("authToken");
        navigate("/login")
    }
    let data= useCart();
    return (
        <div>
            <header className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">

                        <NavLink to='/'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-yellow-500 rounded-full" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                            </svg>  
                        </NavLink>
                       
                        <NavLink to='/'>
                            <span className="ml-3 text-4xl titleName">BiteBliss</span>
                        </NavLink>
                        
                    
                    
                    </a>


                    {/* Navbar items  */}
                    <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                        <NavLink className="mr-5 hover:text-gray-900" to="/">Home</NavLink>
                        <a className="mr-5 hover:text-gray-900">Foot Items</a>
                        <a className="mr-5 hover:text-gray-900">Pricing</a>
                        
                        {
                            (localStorage.getItem("authToken"))?
                            <div className='flex justify-end'>
                                <NavLink to='/myOrder'>My Orders</NavLink> 
                            </div>
                            :""
                        }
                    </nav>
                    
                    {/* Login and signup  */}

                    {
                        (localStorage.getItem("authToken"))?
                        <div className='flex gap-2  justify-between'>

                            <button className=" bg-green-500 px-3 py-1 rounded-lg text-white text-sm" onClick={(e)=>{setCartView(true)}}>
                                    <IconButton aria-label="cart">
                                        <StyledBadge badgeContent={data.length} color="secondary">
                                            <p className='text-white'>My Cart</p><ShoppingCartIcon />
                                        </StyledBadge>
                                    </IconButton>
                            </button>
                            {
                                cartView?<Modal onClose={()=>{setCartView(false)}}> <Cart></Cart> </Modal>:null
                            }
                            <button className=' bg-red-500 px-3 py-1 rounded-lg text-white text-xl' onClick={handleLogout}>Logout</button>
                            
                            
                        </div>
                        :
                            <div className='gap-4 flex justify-between'>
                                <NavLink to='/login'>   
                                    <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Login
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
                                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                                        </svg>
                                    </button>
                                </NavLink>
                                <NavLink to='/signup'>   
                                    <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Signup
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
                                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                                        </svg>
                                    </button>
                                </NavLink>
                            </div>
                    }
                    
                    
                </div>
            </header>
            
        </div>
    )
}

export default Navbar
