import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCard';
import SplitCardForm from './SplitCardForm';


const stripePromise = loadStripe('pk_test_51IeH1tCIW0BkrTRE8d8afxDs1DeFYm5stqp4qvLPKUpAUCNdfkEn1q1MOwS6ZLdgpNJNDfjIPs0aF29kZ2yeqTok00HDaxItJY');
const ProcessPayment = ({handlePaymentSuccess}) => {
    return (
        <Elements stripe={stripePromise}>
            <SimpleCardForm handlePaymentSuccess={handlePaymentSuccess}/>
            {/* <SplitCardForm/> */}
        </Elements>
    );
};

export default ProcessPayment;