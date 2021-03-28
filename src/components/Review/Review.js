import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getDatabaseCart, removeFromDatabaseCart } from '../../databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css'
import happyImag from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    const history = useHistory();
    const handleProceedCheckout = () => {
        history.push('/shipment')
    }
    useEffect(() =>  {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart)

        fetch('http://localhost:5000/productsByKeys', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(productKeys)
        }).then(res => res.json()).then(data => {
            setCart(data)
        })

    }, []);
    return (
        <div className="review-container">
            <div className="review-product">
                {
                    cart.map(pd => <ReviewItem 
                    product={pd}
                    key={pd.key}
                    removeProduct={removeProduct}
                    />)
                }
                {orderPlaced && <img src={happyImag} alt="ThankYouImg"/>}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="main-btn">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;