import React from 'react';


const Cart = (props) => {
    const cart = props.cart
    let total = 0;
    cart.map(product => {
        return total = total + product.price * product.quantity || 1;
    })
    const numberFixed = (num) => {
        return num.toFixed(2)
    }
    let shipping = 0;
    if(total > 35 ){
        shipping = 0;
    }
    else if(total > 15 ){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99;
    }
    const tax = total / 10;
    return (
        <div>
            <h3>Order Summery</h3>
            <h4>Items ordered: {cart.length}</h4>
            <p><small>Shipping cost: {shipping}</small></p>
            <h4>Total before tax: ${numberFixed(total + shipping)}</h4>
            <h4>Tax(10%): ${numberFixed(tax)}</h4>
            <h3>Order Total: ${numberFixed(total + tax)}</h3>
            {props.children}
        </div>
    );
};

export default Cart;