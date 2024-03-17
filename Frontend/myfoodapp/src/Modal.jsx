import React from 'react'
import ReactDom from 'react-dom'

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: 'rgb(34,34,34)',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '90%',
  width: '90%'
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

export default function Modal({ children, onClose }) {

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} /> 
      {/* overlay -> background  */}
      <div style={MODAL_STYLES}>
        <button className='bg-red-500 text-white text-lg font-semibold py-2 px-4 rounded-lg' style={{ marginLeft: "90%", marginTop: "-35px" }} onClick={onClose}> X </button>
        {children}
        {/* onclose -> when we click it will close sending it as props  */}

      </div>
    </>,
    document.getElementById('cart-root')
    // we need to add div in index.html with id 'cart-root' 
    // all state and component are stored in div with id "root" in index.html
    // we want to create a modal which will open when we click the my cart button
    // if cart is empty it will show "cart is empty"
    // but we are not changing the states of component in root
  )
}