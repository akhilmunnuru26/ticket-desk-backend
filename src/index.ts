import express from 'express';
import cors from 'cors';
import ticketRoutes from './routes/ticketRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

app.use((req, res, next) => {
  // Allowing any frontend to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Instantly approve all preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  next();
});

app.use(express.json()); 

// Routes
app.use('/api/tickets', ticketRoutes);
app.use('/api/users', userRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});