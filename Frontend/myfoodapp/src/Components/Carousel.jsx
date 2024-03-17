import React, { useState } from 'react'
import SimpleImageSlider from "react-simple-image-slider";
import image1 from '../Resources/C1.jpg'
import image2 from '../Resources/C2.jpg'
import image3 from '../Resources/C3.jpg'
import image4 from '../Resources/C4.jpg'
import {FaChevronLeft,FaChevronRight} from 'react-icons/fa'

const images = [
     image1 ,
     image2 ,
     image3 ,
     image4 ,
  ];
function Carousel() {
    const [index,setIndex]=useState(0)  
    function leftHandler() {
        if (index === 0) {
            setIndex(images.length - 1);
        } else {
            setIndex(index - 1);
        }
    }
    
    function rightHandler() {
        if (index === images.length - 1) {
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
    }
    
    return (
        // <div className="border mt-10 max-w-[1000px] bg-white flex items-center relative mx-auto ">
        //     <div className='w-[80%] mx-auto'>
        //         <img src={images[index]} alt="" className="w-full object-cover" />
        //     </div>
        //     <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4">
        //         <button
        //             disabled={images.length <= 1}
        //             onClick={leftHandler}
        //             className="text-black focus:outline-none"
        //         >
        //             <FaChevronLeft size={24} />
        //         </button>
        //         <button
        //             disabled={images.length <= 1}
        //             onClick={rightHandler}
        //             className="text-black focus:outline-none"
        //         >
        //             <FaChevronRight size={24} />
        //         </button>
        //     </div>
        // </div>
        <div className="bg-white relative">
            {/* Carousel */}
            <div className="w-full overflow-hidden ">
                <img src={images[index]} alt="" className="w-full h-72 sm:h-96 object-cover" />
            </div>

            {/* Arrows */}
            <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4">
                <button
                    disabled={images.length <= 1}
                    onClick={leftHandler}
                    className="text-black focus:outline-none relative"
                >
                    <span className="rounded-full bg-gray-300 ">
                        <FaChevronLeft size={24} />
                    </span>
                </button>
                <button
                    disabled={images.length <= 1}
                    onClick={rightHandler}
                    className="text-black focus:outline-none relative"
                >
                    <span className="rounded-full bg-gray-300 ">
                        <FaChevronRight size={24} />
                    </span>
                </button>
            </div>
        </div>

    )
}

export default Carousel
