import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ModifyProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('User not authenticated');
        }
        const response = await axios.get(`http://localhost:5000/orders/${id}`, {
          headers: {
            Authorization: `${token}`
          }
        });
        setProduct(response.data);
        setFormData({
          name: response.data.name,
          description: response.data.description,
          price: response.data.price
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Product not found');
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('User not authenticated');
        }
      await axios.put(`http://localhost:5000/products/update/${id}`, formData,{
        headers: {
          Authorization: `${token}`
        }
      });
      navigate(`/product/${id}`);
    } catch (error) {
      console.error(error);
      setError('An error occurred while modifying the product');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Modify Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div>
          <label>Price:</label>
          <input type="text" name="price" value={formData.price} onChange={handleChange} />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default ModifyProduct;
