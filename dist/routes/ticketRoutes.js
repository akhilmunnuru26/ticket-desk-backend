"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticketController_1 = require("../controllers/ticketController");
const router = (0, express_1.Router)();
// Core Ticket Routes
router.get('/', ticketController_1.getTickets);
router.post('/', ticketController_1.createTicket);
router.get('/:id', ticketController_1.getTicketById);
router.patch('/:id', ticketController_1.updateTicket);
// Comment Sub-Routes
router.get('/:id/comments', ticketController_1.getTicketComments);
router.post('/:id/comments', ticketController_1.createTicketComment);
exports.default = router;
