import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.product;
    const reviewItemStyle = {
        borderBottom: '1px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px',
    }
    return (
        <div style={reviewItemStyle}>
            <h4>{name}</h4>
            <h4>Quantity: {quantity}</h4>
            <h4>Price: ${price}</h4>
            <button onClick={() => props.removeProduct(key)} className="main-btn">Remove</button>
        </div>
    );
};

export default ReviewItem;