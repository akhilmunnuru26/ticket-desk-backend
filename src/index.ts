import express from 'express';
import cors from 'cors';
import ticketRoutes from './routes/ticketRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Crucial for allowing the Next.js frontend to talk to this API
app.use(express.json()); // Parses incoming JSON payloads

// Routes
app.use('/api/tickets', ticketRoutes);
app.use('/api/users', userRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});