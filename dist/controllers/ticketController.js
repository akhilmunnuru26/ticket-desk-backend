"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTicketComment = exports.getTicketComments = exports.getTicketById = exports.updateTicket = exports.createTicket = exports.getTickets = void 0;
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
// GET /tickets
const getTickets = async (req, res) => {
    try {
        // Using standard, reliable select syntax
        const allTickets = await db_1.db.select().from(schema_1.tickets).orderBy((0, drizzle_orm_1.desc)(schema_1.tickets.createdAt));
        res.json(allTickets);
    }
    catch (error) {
        // THIS IS THE CRUCIAL LINE 👇
        console.error("🔥 GET TICKETS ERROR:", error);
        res.status(500).json({ error: 'Failed to fetch tickets' });
    }
};
exports.getTickets = getTickets;
// POST /tickets
const createTicket = async (req, res) => {
    try {
        const { title, description, priority } = req.body;
        // Basic validation
        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required' });
        }
        const newTicket = await db_1.db.insert(schema_1.tickets).values({
            title,
            description,
            priority: priority || 'low',
            status: 'open'
        }).returning(); // .returning() tells Postgres to send back the created row
        res.status(201).json(newTicket[0]);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create ticket' });
    }
};
exports.createTicket = createTicket;
// PATCH /tickets/:id
const updateTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, assignedToUserId } = req.body;
        // 1. Create a dynamic update object
        const updateData = { updatedAt: new Date() };
        // 2. Only add fields to the update object if they exist in the request
        if (status !== undefined) {
            updateData.status = status;
        }
        // We check against undefined so we can still allow null (for "Unassigned")
        if (assignedToUserId !== undefined) {
            updateData.assignedToUserId = assignedToUserId;
        }
        const updatedTicket = await db_1.db.update(schema_1.tickets)
            .set(updateData) // 3. Pass the clean object to Drizzle
            .where((0, drizzle_orm_1.eq)(schema_1.tickets.id, parseInt(id, 10)))
            .returning();
        res.json(updatedTicket[0]);
    }
    catch (error) {
        console.error("🔥 UPDATE TICKET ERROR:", error);
        res.status(500).json({ error: 'Failed to update ticket' });
    }
};
exports.updateTicket = updateTicket;
// GET /tickets/:id
const getTicketById = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await db_1.db.select()
            .from(schema_1.tickets)
            .where((0, drizzle_orm_1.eq)(schema_1.tickets.id, parseInt(id, 10)));
        if (ticket.length === 0) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        res.json(ticket[0]);
    }
    catch (error) {
        console.error("🔥 GET TICKET BY ID ERROR:", error);
        res.status(500).json({ error: 'Failed to fetch ticket' });
    }
};
exports.getTicketById = getTicketById;
// GET /tickets/:id/comments
const getTicketComments = async (req, res) => {
    try {
        const { id } = req.params;
        const ticketComments = await db_1.db.select()
            .from(schema_1.comments)
            .where((0, drizzle_orm_1.eq)(schema_1.comments.ticketId, parseInt(id, 10)))
            // Typically, you want the oldest comments at the top, like a chat history
            .orderBy(schema_1.comments.createdAt);
        res.json(ticketComments);
    }
    catch (error) {
        console.error("🔥 GET COMMENTS ERROR:", error);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
};
exports.getTicketComments = getTicketComments;
// POST /tickets/:id/comments
const createTicketComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }
        const newComment = await db_1.db.insert(schema_1.comments).values({
            ticketId: parseInt(id, 10),
            message
        }).returning();
        res.status(201).json(newComment[0]);
    }
    catch (error) {
        console.error("🔥 CREATE COMMENT ERROR:", error);
        res.status(500).json({ error: 'Failed to create comment' });
    }
};
exports.createTicketComment = createTicketComment;
