import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext=createContext(); //we can update this state from anywhere in our application
const CartDispatchContext=createContext();

const reducer = (state,action)=>{
    switch(action.type){
        case "ADD":
            // console.log("this is action size",action.size);
            return [...state,{id:action.id,name:action.name,qty:action.qty,size:action.size,price:action.price,img:action.img}]
        case "REMOVE":
            let newArr=[...state] 
            // we cannot directly remove from state 
            newArr.splice(action.index,1); //index -> where we want to update , 1 means one item need to be removed
            return newArr;
        
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log("This is update operation ",food.qty, parseInt(action.qty), action.price + food.price)
                    //updating the array returning
                    arr[index] = { ...food, qty: parseInt(action.qty) + parseInt(food.qty), price: action.price + food.price }
                }
                return arr
            })
            return arr
        case "DROP":
            let empArray=[]
            return empArray
        default :
            return "Error in reducer"
    }
}
const CartProvider=({children})=>{
    const [state,dispatch]=useReducer(reducer,[]);
    return(
        <>
            <CartDispatchContext.Provider value={dispatch}>
                <CartStateContext.Provider value={state}>
                    {children}
                </CartStateContext.Provider>
            </CartDispatchContext.Provider>
        </>
    )
}

export const useCart=()=> useContext(CartStateContext);
export const useDisptchCart=()=> useContext(CartDispatchContext);

export default CartProvider