import { Router, Request, Response } from 'express';
import DeliveryPartner from '../models/DeliveryPartner';

const router: Router = Router();

// Create a new partner
router.post('/', async (req: Request, res: Response): Promise<any> => {
    const { name, email, phone, status, currentLoad, areas, shift, metrics } = req.body;

    try {
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

        const partner = await newPartner.save();
        res.status(201).json(partner);
    } catch (error) {
        res.status(500).json({ message: 'Error creating partner', error });
    }
});

// Get all partners
router.get('/', async (req: Request, res: Response): Promise<any> => {
    try {
        const partners = await DeliveryPartner.find();
        res.status(200).json(partners);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching partners', error });
    }
});

// Update a partner (Explicitly typing req.params for dynamic route)
router.put('/:id', async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params; // Explicitly extracting the 'id' from params
    try {
        const updatedPartner = await DeliveryPartner.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPartner) return res.status(404).json({ message: 'Partner not found' });
        res.status(200).json(updatedPartner);
    } catch (error) {
        res.status(500).json({ message: 'Error updating partner', error });
    }
});

// Delete a partner (Explicitly typing req.params for dynamic route)
router.delete('/:id', async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params; // Explicitly extracting the 'id' from params
    try {
        const deletedPartner = await DeliveryPartner.findByIdAndDelete(id);
        if (!deletedPartner) return res.status(404).json({ message: 'Partner not found' });
        res.status(200).json({ message: 'Partner deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting partner', error });
    }
});

export default router;
