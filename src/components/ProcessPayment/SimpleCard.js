import React, { useState } from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';

const SimpleCardForm = ({handlePaymentSuccess}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentMessage, setPaymentMessage] = useState({})
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setPaymentMessage({error: error.message});
    } else {
      setPaymentMessage({success: true})
      handlePaymentSuccess(paymentMethod.id)
    }
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
        {
            paymentMessage.error && <p style={{color: "red"}}>{paymentMessage.error}</p>
        }
        {
            paymentMessage.success && <p style={{color: "green"}}>your payment is successfully completed</p>
        }
    </div>
  );
};

export default SimpleCardForm;