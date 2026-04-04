import { Router } from 'express';
import { 
  getTickets, 
  createTicket, 
  updateTicket,
  getTicketById,
  getTicketComments,
  createTicketComment
} from '../controllers/ticketController';

const router = Router();

// Core Ticket Routes
router.get('/', getTickets);
router.post('/', createTicket);
router.get('/:id', getTicketById);
router.patch('/:id', updateTicket);

// Comment Sub-Routes
router.get('/:id/comments', getTicketComments);
router.post('/:id/comments', createTicketComment);

export default router;