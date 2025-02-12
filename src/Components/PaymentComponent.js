import React from 'react'
import "../Styles/Payment.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PaymentComponent = ({actualCartPrice,totalCartDiscountPercent,finalCartAmount,totalItems}) => {
  return (
    <div className='payment-div'>

        <div className='heading'>Subtotal ({totalItems} items): </div>
        <div className='total-amount'>{finalCartAmount}</div>
        <div className='actual-amount'>{actualCartPrice}</div>
        <div className='overall-discount'>{totalCartDiscountPercent}% off</div>
        <div className='proceed-to-pay-div'><button className='payment-button'>Procced to Checkout {" "}<FontAwesomeIcon icon="fa-solid fa-arrow-right" size="lg" className='checkout-icon'/></button></div>


    </div>
  )
}

export default PaymentComponent