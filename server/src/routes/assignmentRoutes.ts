import express from 'express';
import Assignment from '../models/Assignment';

const router = express.Router();

// Create a new assignment
router.post('/run', async (req, res) => {
    const { orderId, partnerId, status, reason } = req.body;

    try {
        const newAssignment = new Assignment({
            orderId,
            partnerId,
            status,
            reason,
            timestamp: new Date()
        });

        const assignment = await newAssignment.save();
        res.status(201).json(assignment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating assignment', error });
    }
});

// Get assignment metrics
router.get('/metrics', async (req, res) => {
    try {
        const totalAssigned = await Assignment.countDocuments();
        const successAssignments = await Assignment.countDocuments({ status: 'success' });
        const successRate = successAssignments / totalAssigned * 100;

        const averageTime = await Assignment.aggregate([
            { $match: { status: 'success' } },
            { $group: { _id: null, avgTime: { $avg: { $subtract: [ '$timestamp', '$createdAt' ] } } } }
        ]);

        const failureReasons = await Assignment.aggregate([
            { $match: { status: 'failed' } },
            { $group: { _id: '$reason', count: { $sum: 1 } } }
        ]);

        res.status(200).json({
            totalAssigned,
            successRate,
            averageTime: averageTime[0]?.avgTime || 0,
            failureReasons
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching assignment metrics', error });
    }
});

export default router;
