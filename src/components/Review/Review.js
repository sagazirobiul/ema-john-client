import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../databaseManager';
import fakeData from '../../fakeData';
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
        const productKey = Object.keys(saveCart)
        const cartProducts = productKey.map(key => {
            let product =  fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key];
            return product;
        });
        setCart(cartProducts);
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