import { Router, Request, Response } from 'express';
import Order from '../models/Order';

const router: Router = Router();

// Create a new order
router.post('/', async (req: Request, res: Response): Promise<any> => {
    const { orderNumber, customer, area, items, status, scheduledFor, totalAmount } = req.body;

    try {
        const newOrder = new Order({
            orderNumber,
            customer,
            area,
            items,
            status,
            scheduledFor,
            totalAmount
        });

        const order = await newOrder.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
});

// Get all orders
router.get('/', async (req: Request, res: Response): Promise<any> => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
});

// Update order status (Explicitly typing req.params for dynamic route)
router.put('/:id/status', async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params; // Explicitly extracting the 'id' from params
    const { status } = req.body;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error updating order status', error });
    }
});

// Assign order to a partner
router.post('/assign', async (req: Request, res: Response): Promise<any> => {
    const { orderId, partnerId } = req.body;

    try {
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.assignedTo = partnerId;
        order.status = 'assigned';
        await order.save();

        res.status(200).json({ message: 'Order assigned' });
    } catch (error) {
        res.status(500).json({ message: 'Error assigning order', error });
    }
});

export default router;
