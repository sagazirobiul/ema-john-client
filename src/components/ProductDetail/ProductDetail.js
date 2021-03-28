import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product'

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({})
    useEffect(() => {
        fetch('http://localhost:5000/products/'+productKey)
        .then(res => res.json())
        .then(data => setProduct(data))
    }, [productKey])
    return (
        <div>
            <h2>Your Product Detail is here</h2>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;
