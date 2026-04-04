import express from 'express';
import cors from 'cors';
import ticketRoutes from './routes/ticketRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Crucial for allowing the Next.js frontend to talk to this API
app.use(express.json()); // Parses incoming JSON payloads

// Routes
app.use('/api/tickets', ticketRoutes);

// Add a quick user endpoint to satisfy the "GET /users" requirement
app.get('/api/users', async (req, res) => {
    // You'd import db and users schema here
    // const allUsers = await db.select().from(users);
    // res.json(allUsers);
    res.json([{ id: 1, name: "Admin Setup", email: "admin@zeto.com"}]); // placeholder
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});