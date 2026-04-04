import { Request, Response } from 'express';
import { db } from '../db';
import { users } from '../db/schema';

// GET /users
export const getUsers = async (req: Request, res: Response) => {
  try {
    // Fetch all users from the database using Drizzle
    const allUsers = await db.select().from(users);
    
    res.json(allUsers);
  } catch (error) {
    console.error("🔥 GET USERS ERROR:", error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};