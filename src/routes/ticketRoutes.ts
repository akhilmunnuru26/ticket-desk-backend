import { Router } from 'express';
import { getTickets, createTicket, updateTicket } from '../controllers/ticketController';

const router = Router();

router.get('/', getTickets);
router.post('/', createTicket);
router.patch('/:id', updateTicket);
// You would also add GET /:id, GET /:id/comments, POST /:id/comments here

export default router;