import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Profile.css'; 

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    address: '',
    phoneNumber: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('User not authenticated');
        }
        const response = await axios.get('http://localhost:5000/user/profile', {
          headers: {
            Authorization: `${token}`
          }
        }); 
        setUser(response.data); 
        console.log(response.data)
        setFormData({
          username: response.data.username,
          email: response.data.email,
          address: response.data.address || '',
          phoneNumber: response.data.phoneNumber || ''
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

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
      await axios.put('http://localhost:5000/user/update', formData, {
        headers: {
          Authorization: `${token}`
        }
      });
      setSuccessMessage('Profile updated successfully');
    } catch (error) {
      setError('An error occurred while updating profile');
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
        <button type="submit">Update Profile</button>
      </form>
      {user && user.role === 'admin' && (
        <div className="admin-button">
          <Link to="/add-product">
            <button>Add Product</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Profile;
