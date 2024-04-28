import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/orders/all-orders');
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Error fetching orders. Please try again later.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>All Orders</h2>
      {orders.map(order => (
        <div key={order._id}>
          <h3>Order ID: {order._id}</h3>
          <p>User: {order.user.name}</p>
          <p>Total Price: ${order.totalPrice}</p>
          <p>Products:</p>
          <ul>
            {order.products.map(item => (
              <li key={item.product._id}>
                {item.product.name} - Quantity: {item.quantity}
              </li>
            ))}
          </ul>
          <p>Address: {order.address}</p>
        </div>
      ))}
    </div>
  );
};

export default AllOrders;