import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';

const Orders = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [newOrder, setNewOrder] = useState({
        orderNumber: '',
        status: 'pending',
        scheduledFor: '',
    });

    // Fetch orders list
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosInstance.get('/orders');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    // Handle form submission for new order
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/orders', newOrder);
            setNewOrder({
                orderNumber: '',
                status: 'pending',
                scheduledFor: '',
            });
        } catch (error) {
            console.error('Error adding order:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold">Orders</h2>

            <form className="bg-white p-4 rounded mt-4 shadow-md" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Order Number"
                    className="p-2 border rounded mb-2 w-full"
                    value={newOrder.orderNumber}
                    onChange={(e) => setNewOrder({ ...newOrder, orderNumber: e.target.value })}
                />
                <select
                    className="p-2 border rounded mb-2 w-full"
                    value={newOrder.status}
                    onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
                >
                    <option value="pending">Pending</option>
                    <option value="assigned">Assigned</option>
                    <option value="completed">Completed</option>
                    <option value="canceled">Canceled</option>
                </select>
                <input
                    type="datetime-local"
                    className="p-2 border rounded mb-2 w-full"
                    value={newOrder.scheduledFor}
                    onChange={(e) => setNewOrder({ ...newOrder, scheduledFor: e.target.value })}
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
                    Add Order
                </button>
            </form>

            <div className="mt-8">
                {orders.map((order: any) => (
                    <div key={order._id} className="p-4 bg-white shadow-md rounded mb-4">
                        <h3 className="text-xl font-semibold">Order {order.orderNumber}</h3>
                        <p>Status: {order.status}</p>
                        <p>Scheduled for: {order.scheduledFor}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
