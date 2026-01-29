import express from 'express';
import {
  getDefaultCategories,
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';

const router = express.Router();

router.get('/default', getDefaultCategories);
router.get('/', getAllCategories);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
