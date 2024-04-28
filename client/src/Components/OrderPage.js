import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './OrderPage.css'; // Import CSS file

const OrderPage = () => {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [address, setAddress] = useState("");
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/orders/${id}`);
                const prod = response.data;
                setProduct(prod);
            } catch (error) {
                console.error(error);
                setError('Product not found');
            }
        };
        fetchProductDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('User not authenticated');
            }
            await axios.post('http://localhost:5000/orders/order', {
                product: id, 
                quantity: quantity,
                address: address
            }, {
                headers: {
                    Authorization: `${token}`
                }
            });

            navigate('/my-orders')

        } catch (error) {
            console.error(error);
            setError('An error occurred while placing the order');
        }
    };

    return (
        <div className="order-page-container">
            <h2>Order Page</h2>
            <form onSubmit={handleSubmit} className="order-form">
                {product && (
                    <div>
                        <h3>{product.name}</h3>
                        <p>Description: {product.description}</p>
                        <p>Price: ${product.price}</p>
                    </div>
                )}
                <div>
                    <label>Quantity:</label>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div>
                    <label>Address:</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button type="submit">Place Order</button>
            </form>
        </div>
    );
};

export default OrderPage;
