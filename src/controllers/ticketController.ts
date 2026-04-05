import { Request, Response } from 'express';
import { db } from '../db';
import { tickets, users, comments } from '../db/schema';

import { eq, desc } from 'drizzle-orm';

// GET /tickets
export const getTickets = async (req: Request, res: Response) => {
  try {
    // Using standard, reliable select syntax
    const allTickets = await db.select().from(tickets).orderBy(desc(tickets.createdAt));
    
    res.json(allTickets);
  } catch (error) {
    // THIS IS THE CRUCIAL LINE 👇
    console.error("🔥 GET TICKETS ERROR:", error); 
    
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
};

// POST /tickets
export const createTicket = async (req: Request, res: Response) => {
  try {
    // 1. Extract assignedToUserId from the incoming request
    const { title, description, priority, assignedToUserId } = req.body;
    
    // Basic validation
    if (!title || !description) {
       return res.status(400).json({ error: 'Title and description are required' });
    }

    // 2. Add it to the database insert payload
    const newTicket = await db.insert(tickets).values({
      title,
      description,
      priority: priority || 'low',
      status: 'open',
      assignedToUserId: assignedToUserId || null 
    }).returning(); 

    res.status(201).json(newTicket[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create ticket' });
  }
};


// PATCH /tickets/:id
export const updateTicket = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, assignedToUserId } = req.body;

    // 1. Create a dynamic update object
    const updateData: any = { updatedAt: new Date() };
    
    // 2. Only add fields to the update object if they exist in the request
    if (status !== undefined) {
      updateData.status = status;
    }
    
    // We check against undefined so we can still allow null (for "Unassigned")
    if (assignedToUserId !== undefined) {
      updateData.assignedToUserId = assignedToUserId;
    }

    const updatedTicket = await db.update(tickets)
      .set(updateData) // 3. Pass the clean object to Drizzle
      .where(eq(tickets.id, parseInt(id as string, 10)))
      .returning();

    res.json(updatedTicket[0]);
  } catch (error) {
    console.error("🔥 UPDATE TICKET ERROR:", error);
    res.status(500).json({ error: 'Failed to update ticket' });
  }
};


// GET /tickets/:id
export const getTicketById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ticket = await db.select()
      .from(tickets)
      .where(eq(tickets.id, parseInt(id as string, 10)));
      
    if (ticket.length === 0) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    
    res.json(ticket[0]);
  } catch (error) {
    console.error("🔥 GET TICKET BY ID ERROR:", error);
    res.status(500).json({ error: 'Failed to fetch ticket' });
  }
};

// GET /tickets/:id/comments
export const getTicketComments = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ticketComments = await db.select()
      .from(comments)
      .where(eq(comments.ticketId, parseInt(id as string, 10)))
      // Typically, you want the oldest comments at the top, like a chat history
      .orderBy(comments.createdAt); 
      
    res.json(ticketComments);
  } catch (error) {
    console.error("🔥 GET COMMENTS ERROR:", error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

// POST /tickets/:id/comments
export const createTicketComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const newComment = await db.insert(comments).values({
      ticketId: parseInt(id as string, 10),
      message
    }).returning();

    res.status(201).json(newComment[0]);
  } catch (error) {
    console.error("🔥 CREATE COMMENT ERROR:", error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
};