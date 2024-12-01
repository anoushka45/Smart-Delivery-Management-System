import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';

const Dashboard = () => {
    const [metrics, setMetrics] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [partners, setPartners] = useState<any[]>([]);

    // Fetch data for metrics, orders, and partners
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch assignment metrics
                const metricsResponse = await axiosInstance.get('/assignments/metrics');
                setMetrics(metricsResponse.data);

                // Fetch orders
                const ordersResponse = await axiosInstance.get('/orders');
                setOrders(ordersResponse.data);

                // Fetch partners
                const partnersResponse = await axiosInstance.get('/partners');
                setPartners(partnersResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if (!metrics || !orders || !partners) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* Key Metrics Cards */}
                <div className="p-4 bg-white shadow-md rounded">
                    <h3 className="text-xl font-semibold">Total Assignments</h3>
                    <p className="text-lg">{metrics.totalAssigned}</p>
                </div>
                <div className="p-4 bg-white shadow-md rounded">
                    <h3 className="text-xl font-semibold">Success Rate</h3>
                    <p className="text-lg">{metrics.successRate}%</p>
                </div>
                <div className="p-4 bg-white shadow-md rounded">
                    <h3 className="text-xl font-semibold">Average Time</h3>
                    <p className="text-lg">{metrics.averageTime} mins</p>
                </div>
            </div>

            <h2 className="text-2xl font-semibold mt-8">Active Orders</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {orders.map((order: any) => (
                    <div key={order._id} className="p-4 bg-white shadow-md rounded">
                        <h3 className="text-xl font-semibold">Order {order.orderNumber}</h3>
                        <p className="text-sm">Status: {order.status}</p>
                        <p className="text-sm">Scheduled for: {order.scheduledFor}</p>
                    </div>
                ))}
            </div>

            <h2 className="text-2xl font-semibold mt-8">Partners</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {partners.map((partner: any) => (
                    <div key={partner._id} className="p-4 bg-white shadow-md rounded">
                        <h3 className="text-xl font-semibold">{partner.name}</h3>
                        <p className="text-sm">Status: {partner.status}</p>
                        <p className="text-sm">Rating: {partner.metrics.rating}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
