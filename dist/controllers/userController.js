"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const db_1 = require("../db");
const schema_1 = require("../db/schema");
// GET /users
const getUsers = async (req, res) => {
    try {
        // Fetch all users from the database using Drizzle
        const allUsers = await db_1.db.select().from(schema_1.users);
        res.json(allUsers);
    }
    catch (error) {
        console.error("🔥 GET USERS ERROR:", error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};
exports.getUsers = getUsers;
