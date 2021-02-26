import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const product = (props) => {
    const {name, price, img, seller, stock} = props.product
    return (
        <div className="product">
            <div className="product-img">
                <img src={img} alt="productImage"/>
            </div>
            <div>
                <h2 className="product-name">{name}</h2>
                <br/>
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <p><small>only {stock} left in stock - order soon</small></p>
                <button className="main-btn" onClick={() => props.handleAddProduct(props.product)}><FontAwesomeIcon icon={faShoppingCart} />add to cart</button>
            </div>
        </div>
    );
};

export default product;