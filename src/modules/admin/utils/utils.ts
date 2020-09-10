import { Category } from '../models';

export const CATEGORIES: Category[] = [
    Category.TECHNOLOGIES,
    Category.PATTERNS
];

export const isValidCategory = (category: Category) => CATEGORIES.includes(category);