import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://bbs-backend.onrender.com/orders/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Product not found');
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }
      await axios.delete(`https://bbs-backend.onrender.com/products/delete/${id}`, {
        headers: {
          Authorization: `${token}`
        }
      });
      navigate('/');
    } catch (error) {
      console.error(error);
      setError('An error occurred while deleting the product');
    }
  };

  const handleModify = () => {
    navigate(`/modify-product/${id}`);
  };

  const handleOrder = async () => {
    navigate(`/order/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="product-details-container">
      <h2>Product Details</h2>
      {product && (
        <div className="product-details">
          <h3>{product.name}</h3>
          <p>Description: {product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Quantity(Stock): {product.quantity}</p>
          <button onClick={handleDelete}>Delete</button> 
          <button onClick={handleModify}>Modify</button>
          <button onClick={handleOrder}>Order</button>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
