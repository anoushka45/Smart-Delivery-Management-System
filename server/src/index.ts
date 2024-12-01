import express, { Application, Request, Response } from 'express';
import connectDB from './config/db';  // Assuming db.ts is in the same directory
import partnerRoutes from './routes/partnerRoutes';
import orderRoutes from './routes/orderRoutes';
import assignmentRoutes from './routes/assignmentRoutes';
import cors from 'cors';

const app: Application = express();
const PORT = 5000;

// Enable CORS middleware to allow requests from your frontend (React app)
app.use(cors({
  origin: 'http://localhost:5173',  // Frontend URL (adjust if different)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Methods allowed
  allowedHeaders: ['Content-Type', 'Authorization']  // Allowed headers
}));

// Middleware to parse JSON
app.use(express.json());

// Register the routes
app.use('/api/partners', partnerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/assignments', assignmentRoutes);

// Basic route to check if the server is running
app.get('/', (req: Request, res: Response) => {
    res.send('Smart Delivery System Backend is Running!');
});

// Connect to the database
connectDB();

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
