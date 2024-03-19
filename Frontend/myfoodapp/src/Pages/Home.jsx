import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { NavLink, Routes, Route } from 'react-router-dom'
import Card from '../Components/Card'
import Carousel from '../Components/Carousel'
import { FaSearch } from "react-icons/fa";
import axios from 'axios'


   

function Home() {
    const [foodCat,setFoodCat]=useState([]);
    const [foodItem,setfoodItem]=useState([]);
    async function loadData() {
        try {
            const response = await axios.post('https://fooddelivery-78x2.onrender.com/api/v1/foodData');
            
            // Ensure the response contains the expected data structure
            // To convert the response data from an Axios request to JSON format, you can use the data property of the Axios response
            /*
                Axios automatically parses the response body, and the data property of the response object contains the JavaScript representation of the JSON data.
            */
            const foodItemData = response.data[0];
            const foodCategoryData = response.data[1];
    
            console.log(foodItemData, foodCategoryData);
    
            // Assuming setfoodItem and setFoodCat are state update functions
            setfoodItem(foodItemData);
            setFoodCat(foodCategoryData);
        } catch (error) {
            console.error("Error loading data:", error.message);
        }
    }
    useEffect(()=>{
        loadData();
    },[])
    const [search,setSearch]=useState("");
    const changeHandler=(e)=>{
        setSearch(e.target.value);
    }
    return (
        <div >
            <Navbar></Navbar>

            {/* Carousel  */}
            <div>
                <Carousel></Carousel>
            </div>
            {/* Search Bar  */}
            <div className='mt-4 flex justify-center gap-2'>
                <input
                    type="search"
                    placeholder='Search...'
                    className='px-10 py-2 border border-gray-300 rounded-md outline-none bg-gray-100'
                    value={search}
                    onChange={changeHandler}
                />
                <button className=''>
                    <FaSearch />
                </button>
            </div>
            {/* Card Grid  */}
            <div className='flex flex-col m-10 flex-wrap w-10/11'>
                {
                    (foodCat && foodCat.length !== 0 ) ? foodCat.map((data)=>{
                        return (
                        <>
                            <div key={data._id} className='text-center text-4xl  font-bold text-white mb-3 bg-gradient-to-r from-cyan-500 to-blue-500 p-4'>
                                {data.CategoryName}
                            </div>
                            <hr />
                            <div className='grid lg:grid-cols-3 md:grid-cols-1'>

                            
                                {
                                    foodItem.length !== 0 ?
                                        foodItem.filter((item)=> ((item.CategoryName===data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))).map(
                                            filterItems=>{
                                                return(
                                                    <div key={filterItems._id} >
                                                        <Card foodItem={filterItems}
                                                              options={filterItems.options[0]}
                                                              ></Card>
                                                    </div>
                                                )
                                            }
                                        )
                                    : <div>No such data found</div>
                                }
                            </div>
                            
                        </>
                        )
                    }): <div>Hello world</div>

                }
            
            </div>
            {/* Footer  */}
            <div><Footer></Footer></div>

        </div>

    )
}

export default Home
