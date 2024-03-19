import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios';
import { NavLink ,useNavigate} from 'react-router-dom';
import Signup from '../Pages/Signup'

function Login(){
    let navigate=useNavigate();
    const [formdata,setFormData]=useState({email:"",password:""})
    // const handleSubmit=async(e)=>{
    //     e.preventDefault();
    //     const response=axios.post('http://localhost:5000/api/v1/login',formdata)
    //     console.log("This is my login response",response)
    //     // const json = await response.json()
       
    //     if(response){
    //         localStorage.setItem("authToken",response.token);
    //         console.log("this is my user",response.user);
    //         localStorage.setItem("userEmail",response.user?.email);
    //         navigate('/')
    //     }
    //     if(!response){
    //         alert("Enter Valid Credentials")
    //     }
    // }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://fooddelivery-78x2.onrender.com/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formdata)
            });
    
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("userEmail", data.user?.email);
                console.log("this is my user", data.user);
                navigate('/');
            } else {
                alert("Enter Valid Credentials");
            }
        } catch (error) {
            console.error('Error occurred while logging in:', error);
            alert("An error occurred. Please try again later.");
        }
    };
    function handleChange(e){
        setFormData({...formdata,[e.target.name]:e.target.value})
        
    }
    return (
        <>
            <Navbar></Navbar>
            <section class="bg-gray-50 dark:bg-gray-900" onSubmit={handleSubmit}>
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        {/* <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/> */}
                            Login
                    </a>
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Log in to your account
                            </h1>
                            <form class="space-y-4 md:space-y-6" action="#">
                                
                                <div>
                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" value={formdata.email} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={handleChange}/>
                                </div>
                                <div>
                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
                                    <input type="password" name="password" id="password" value={formdata.password} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="password" required="" onChange={handleChange}/>
                                </div>
                                
                                <div class="flex items-center justify-between">
                                    <div class="flex items-start">
                                        {/* <div class="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                                        </div>  */}
                                        {/* <div class="ml-3 text-sm">
                                            <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                                        </div> */}
                                    </div>
                                    {/* <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-500">Forgot password?</a> */}
                                </div>
                                <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl bg-purple-600 px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don't have an account yet? 
                                    {/* <button className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                            Sign Up
                                            <Signup>
                                            </Signup>
                                    </button> */}
                                    <NavLink to='/signup' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</NavLink>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
