import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, errors } = useForm();
    const [shippingData, setShippingData] = useState(null)
    const onSubmit = data => {
     setShippingData(data);
    };

    const handlePaymentSuccess = paymentId => {
      const saveCart = getDatabaseCart();
      const orderDetails = {loggedInUser, 
        products: saveCart, 
        shipment: shippingData,
        paymentId,
        orderTime: new Date(),
      }
      fetch('https://polar-spire-94448.herokuapp.com/addOrder', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(orderDetails)
      }).then(res => res.json()).then(data => {
        if(data){
          // alert('your order placed successfully')
          processOrder();
        }
      })
    }

     return (
    <div className="container">
      <div className="row">
        <div style={{display: shippingData ? 'none' : 'block'}} className="col-md-6">
            <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
              <input name="name" ref={register({ required: true })} placeholder='Your name' defaultValue={loggedInUser.name}/>
              {errors.name && <span className="error">Name is required</span>}

              <input name="email" ref={register({ required: true })} placeholder='Your email' defaultValue={loggedInUser.email}/>
              {errors.email && <span className="error">Email is required</span>}

              <input name="address" ref={register({ required: true })} placeholder='Your address'/>
              {errors.address && <span className="error">Address is required</span>}

              <input name="phone" ref={register({ required: true })} placeholder='Your phone number'/>
              {errors.phone && <span className="error">Phone Number is required</span>}
              <input type="submit" />
            </form>
        </div>
        <div style={{display: shippingData ? 'block' : 'none'}} className="col-md-6">
            <h3>Payment For me :)</h3>
            <ProcessPayment handlePaymentSuccess={handlePaymentSuccess}/>
        </div>
      </div>
    </div>
  )
};

export default Shipment;