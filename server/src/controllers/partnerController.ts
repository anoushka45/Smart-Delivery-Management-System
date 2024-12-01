import { Request, Response } from 'express';
import DeliveryPartner from '../models/DeliveryPartner';

// Define the expected request parameters
interface Params {
    id: string;
}

// GET all partners
export const getPartners = async (req: Request, res: Response): Promise<Response> => {
    try {
        const partners = await DeliveryPartner.find();
        return res.status(200).json(partners);
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch partners" });
    }
};

// CREATE a new partner
export const createPartner = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, phone, status, currentLoad, areas, shift, metrics } = req.body;

    const newPartner = new DeliveryPartner({
        name,
        email,
        phone,
        status,
        currentLoad,
        areas,
        shift,
        metrics
    });

    try {
        const savedPartner = await newPartner.save();
        return res.status(201).json(savedPartner);
    } catch (error) {
        return res.status(500).json({ message: "Failed to create partner" });
    }
};

// UPDATE a partner
export const updatePartner = async (req: Request<Params>, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { name, email, phone, status, currentLoad, areas, shift, metrics } = req.body;

    try {
        const updatedPartner = await DeliveryPartner.findByIdAndUpdate(id, {
            name,
            email,
            phone,
            status,
            currentLoad,
            areas,
            shift,
            metrics
        }, { new: true });

        if (!updatedPartner) {
            return res.status(404).json({ message: "Partner not found" });
        }

        return res.status(200).json(updatedPartner);
    } catch (error) {
        return res.status(500).json({ message: "Failed to update partner" });
    }
};

// DELETE a partner
export const deletePartner = async (req: Request<Params>, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
        const deletedPartner = await DeliveryPartner.findByIdAndDelete(id);
        if (!deletedPartner) {
            return res.status(404).json({ message: "Partner not found" });
        }

        return res.status(200).json({ message: "Partner deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete partner" });
    }
};
