import { Router } from 'express';
import { createCategory, getCategories } from './category.controller';

const router = Router();

router.post('/', createCategory);
router.get('/', getCategories);

export default router;
