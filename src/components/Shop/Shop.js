import React, { useEffect, useState } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../databaseManager';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';


const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart)
        const previousCart = productKeys.map( existingKey => {
            const product = fakeData.find(product => product.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        })
        setCart(previousCart)
    }, [])

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(product => product.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity =  sameProduct.quantity + 1;
            const others = cart.filter(product => product.key !== toBeAddedKey)
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart)

        addToDatabaseCart(product.key, count)
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(product => <Product handleAddProduct={handleAddProduct} key={product.key} product={product}
                    showAddToCart={true}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-btn">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;