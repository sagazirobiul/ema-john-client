import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../databaseManager';
import './Shipment.css';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
      const saveCart = getDatabaseCart();
      const orderDetails = {...loggedInUser, products: saveCart, shipment: data, orderTime: new Date()}
      fetch('http://localhost:5000/addOrder', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(orderDetails)
      }).then(res => res.json()).then(data => {
        if(data){
          alert('your order placed successfully')
          processOrder();
        }
      })
    };
     return (
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
  )
};

export default Shipment;