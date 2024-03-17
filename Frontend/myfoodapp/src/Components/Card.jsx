import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDisptchCart } from './ContextReducer';

function Card(props) {



    let dispatch = useDisptchCart();
    let data = useCart();
    const priceRef = useRef()
    let options = props.options;
    let priceOptions = Object.keys(options); // options is object and priceoptions will have its keys and values will be values we will give to half and full prices
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    const handleAddToCart = async () => {
        if (localStorage.getItem("authToken")) {
            let food = []
            for (const item of data) {
                if (item.id === props.foodItem._id) {
                    //props.foodItem._id -> id of element on which we just clicked for add to cart
                    //we are searching wheather this id already belongs to our cart 
                    food = item;
                    break;
                }
            }
            console.log(food)
            console.log(new Date())
            if (food.length !== 0) {
                // if size is not changed i.e we are ordering "full" size but changing the quantity , then we call it as update
                //if size changes it becomes whole new order 
                if (food.size === size) {
                    await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                    return
                }
                else if (food.size !== size) {
                    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.img })
                    console.log("Size different so simply ADD one more to the list")
                    return
                }
                return
            }
            await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
            console.log(data);
        }
        else {
            alert("Please login to continue")
        }

    }
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    let finalPrice = qty * parseInt(options[size]);

    return (
        <section class="text-gray-600 body-font ">
            <div class="container px-10 py-24 mx-auto">

                <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 justify-center">
                    {/* <div class="p-4 md:w-1/3 sm:mb-0 mb-6 "> */}
                    <div class="rounded-lg h-64 w-80 overflow-hidden ">
                        <img alt="content" class="object-fit object-center h-full w-full " src={props.foodItem.img} />
                    </div>
                    <h2 class="text-xl text-center font-medium title-font text-gray-900 mt-5 mb-2 w-full">{props.foodItem.name}</h2>
                    {/* <p class="text-base leading-relaxed mt-2 ml-2">{props.description}</p> */}

                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-row  justify-start'>
                            <select className="m-2 h-max bg-slate-400 rounded-lg p-2" onChange={(e) => { setQty(e.target.value) }}>
                                {
                                    Array.from(Array(6), (e, i) => {
                                        return (
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        )
                                    })
                                }
                            </select>
                            <select className='m-2 h-max bg-slate-400 rounded-lg p-2' ref={priceRef} onChange={(e) => { setSize(e.target.value) }}>
                                {
                                    priceOptions.map((data) => {
                                        return <option key={data} value={data}>{data}</option>
                                    })
                                }
                            </select>
                            <p className='flex items-center text-2xl'><span class="WebRupee">&#x20B9;</span>{finalPrice}</p>
                        </div>
                        <hr />
                        <button className="flex items-center justify-center bg-green-500 text-white font-semibold py-2 px-4 rounded-md transition-transform duration-300 hover:scale-95 focus:outline-none active:scale-90"
                            onClick={handleAddToCart}>Add To Cart</button>

                    </div>

                    {/* </div> */}
                </div>
            </div>
        </section>
    )
}

export default Card
