import React from 'react';
import { useCart, useDisptchCart } from '../Components/ContextReducer';
import { FaTrash } from "react-icons/fa";
import axios from 'axios';

export default function Cart() {
  let data = useCart();
  let dispatch = useDisptchCart();

  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3 text-white text-2xl'>The Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await axios.post("http://localhost:5000/api/v1/orderData", {
      order_data: data,
      email: userEmail,
      order_date: new Date().toDateString()
    });

    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className='container mx-auto mt-5 overflow-x-auto'>
      <table className='table-auto w-full border-collapse'>
        <thead className='text-green-500 text-lg font-semibold mb-4'>
          <tr>
            <th className="border px-4">#</th>
            <th className="border px-4">Name</th>
            <th className="border px-4">Quantity</th>
            <th className="border px-4">Option</th>
            <th className="border px-4">Amount</th>
            <th className="border px-4"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((food, index) => (
            <tr key={index} className="text-white">
              <td className="border px-4">{index + 1}</td>
              <td className="border px-4">{food.name}</td>
              <td className="border px-4">{food.qty}</td>
              <td className="border px-4">{food.size}</td>
              <td className="border px-4">{food.price}</td>
              <td className="border px-4">
                <button type="button" className="p-0" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>
                  <FaTrash className="text-red-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div><h1 className='text-2xl text-blue-400 mt-10'>Total Price: {totalPrice}/-</h1></div>
      <div className='flex justify-center items-center'>
        <button className='bg-green-500 text-white py-2 px-4 mt-5 rounded-lg' onClick={handleCheckOut}>Check Out</button>
      </div>
    </div>
  );
}
