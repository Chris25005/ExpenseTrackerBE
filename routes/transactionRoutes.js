import express from 'express';
import {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  getMonthlySummary,
  getYearlySummary,
  getDashboardStats
} from '../controllers/transactionController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

router.post('/', createTransaction);
router.get('/stats/dashboard', getDashboardStats);
router.get('/summary/monthly', getMonthlySummary);
router.get('/summary/yearly', getYearlySummary);
router.get('/', getTransactions);
router.get('/:id', getTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;
