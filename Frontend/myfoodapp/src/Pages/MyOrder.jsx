import React, { useEffect, useState } from 'react'

import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

export default function MyOrder() {

    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        await fetch("https://fooddelivery-78x2.onrender.com/api/v1/myOrderData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response)
        })



        // await res.map((data)=>{
        //    console.log(data)
        // })


    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <div className='row mx-20'>

                    {orderData.length !== 0 ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div  >
                                                    {arrayData.Order_date ? <div className='mx-auto mt-5 text-center'>

                                                        {data = arrayData.Order_date}
                                                        <hr />
                                                    </div> :

                                                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                                                            <div className="card mt-3 w-72 max-h-96">
                                                                {/* <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} /> */}
                                                                {/* <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className="container flex items-center justify-between h-9">
                                                                        <span className="m-1">{arrayData.qty}</span>
                                                                        <span className="m-1">{arrayData.size}</span>
                                                                        <span className="m-1">{data}</span>
                                                                        <div className="inline-block ms-2 h-full w-20 text-lg font-sans">
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div> */}
                                                                <div className="card-body bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 p-3 rounded-lg ml-2 flex flex-col w-full ">
                                                                    <h5 className="card-title font-extrabold text-white">{arrayData.name}</h5>

                                                                    <div className="container flex flex-col justify-between h-full pl-3">
                                                                        <span className="m-1 font-semibold"><span >Quantity:  </span>{arrayData.qty}</span>
                                                                        <span className="m-1 font-semibold"><span>Size:  </span>{arrayData.size}</span>
                                                                        <span className="m-1 font-semibold"><span>Date: </span>{data}</span>
                                                                        <div className="ml-1 h-full w-20 text-lg font-semibold flex flex-row gap-2">
                                                                            <span>Price:</span>
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>




                                                    }

                                                </div>
                                            )
                                        })

                                    )
                                }) : ""
                        )
                    }) : ""}
                </div>


            </div>

            <Footer />
        </div>
    )
}