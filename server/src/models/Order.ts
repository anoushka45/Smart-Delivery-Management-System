import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
    orderNumber: string;
    customer: { name: string; phone: string; address: string };
    area: string;
    items: { name: string; quantity: number; price: number }[];
    status: 'pending' | 'assigned' | 'picked' | 'delivered';
    scheduledFor: string;
    assignedTo?: string; // partner ID
    totalAmount: number;
    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema: Schema = new Schema({
    orderNumber: { type: String, required: true },
    customer: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true }
    },
    area: { type: String, required: true },
    items: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    status: { type: String, enum: ['pending', 'assigned', 'picked', 'delivered'], default: 'pending' },
    scheduledFor: { type: String, required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'DeliveryPartner' },
    totalAmount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
