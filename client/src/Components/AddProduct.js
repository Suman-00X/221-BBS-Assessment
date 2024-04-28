import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [image, setImage] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }
      await axios.post('http://localhost:5000/products/add', {
        name,
        description,
        price,
        color,
        size,
        image,
        quantity
      }, {
        headers: {
          Authorization: `${token}`
        }
      });
      navigate('/');
    } catch (error) {
      console.error(error);
      setError('An error occurred while adding the product');
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div>
          <label>Color:</label>
          <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
        <div>
          <label>Size:</label>
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
