import { Request, Response } from 'express';
import Category from './category.model';

export const createCategory = async (req: Request, res: Response) => {
  const category = await Category.create(req.body);
  res.json(category);
};

export const getCategories = async (_: Request, res: Response) => {
  const categories = await Category.find();
  res.json(categories);
};
