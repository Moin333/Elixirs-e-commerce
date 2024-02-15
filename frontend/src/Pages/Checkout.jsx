// Checkout.jsx

import React, { useState } from 'react';
import { useContext } from 'react';
import './CSS/Checkout.css';
import { ShopContext } from '../Context/ShopContext.jsx';


const Checkout = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart, initiatePayment } = useContext(ShopContext);

  // State for capturing user information
  const [userInfo, setUserInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    country: '',
    streetAddress: '',
    postalCode: '',
    phoneNumber: '',
    stateProvince: '',
    city: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleProceedToCheckout = async () => {
    try {
      // Validate user input
      const requiredFields = ['email', 'firstName', 'lastName', 'country', 'streetAddress', 'postalCode', 'phoneNumber', 'stateProvince', 'city'];
  
      for (const field of requiredFields) {
        if (!userInfo[field]) {
          alert(`Please enter ${field}`);
          return;
        }
      }
  
      // Make the API call to store userInfo in the database
      const response = await fetch('http://localhost:4000/api/checkout/storeUserInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });
  
      if (response.ok) {
        // Call the initiatePayment function when proceeding to checkout
        initiatePayment(userInfo);
        // You can also perform additional validation before proceeding to payment
      } else {
        console.error('Failed to store user information in the database');
        // Display a user-friendly error message to the user
        alert('Failed to proceed to checkout. Please try again later.');
      }
    } catch (error) {
      console.error('Error making API call:', error);
      // Display a user-friendly error message to the user
      alert('An unexpected error occurred. Please try again later.');
    }
  };
  


  return (
    <div className='checkout'>
      <div className='checkout-container-left'>
        <h2>Checkout</h2>

        {/* User Information */}
        <div className='user-info-section'>
          {/* ... (Input fields for user information) */}
          <label>Email Address:</label>
          <input type='text' name='email' value={userInfo.email} onChange={handleInputChange} />

          <label>First Name:</label>
          <input type='text' name='firstName' value={userInfo.firstName} onChange={handleInputChange} />

          <label>Last Name:</label>
          <input type='text' name='lastName' value={userInfo.lastName} onChange={handleInputChange} />

          <label>Country:</label>
          <input type='text' name='country' value={userInfo.country} onChange={handleInputChange} />

          <label>Street Address:</label>
          <input type='text' name='streetAddress' value={userInfo.streetAddress} onChange={handleInputChange} />

          <label>Postal Code:</label>
          <input type='text' name='postalCode' value={userInfo.postalCode} onChange={handleInputChange} />

          <label>Phone Number:</label>
          <input type='text' name='phoneNumber' value={userInfo.phoneNumber} onChange={handleInputChange} />

          <label>State/Province:</label>
          <input type='text' name='stateProvince' value={userInfo.stateProvince} onChange={handleInputChange} />

          <label>City:</label>
          <input type='text' name='city' value={userInfo.city} onChange={handleInputChange} />
        </div>

        {/* Proceed to Payment Button */}
        <button onClick={handleProceedToCheckout} className='checkout-button'>
          Proceed to Payment
        </button>
      </div>

      {/* Order Summary Section */}
      <div className='order-summary'>
        <h3>Order Summary</h3>

        {/* Display individual items in the order */}
        {all_product.map((e) => {
          if (cartItems[e.id] > 0) {
            return (
              <div key={e.id} className='order-summary-item'>
                <span>{e.name}</span>
                <span>{cartItems[e.id]} x ₹{e.new_price}</span>
                <span>₹{e.new_price * cartItems[e.id]}</span>
              </div>
            );
          }
          return null;
        })}

        <hr />

        {/* Display total amount */}
        <div className='order-total'>
          <div className='order-total-item'>
            <span>Subtotal</span>
            <span>₹{getTotalCartAmount()}</span>
          </div>
          <div className='order-total-item'>
            <span>Shipping Fee</span>
            <span>Free</span>
          </div>
          <hr />
          <div className='order-total-item'>
            <h3>Total</h3>
            <h3>₹{getTotalCartAmount()}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;


