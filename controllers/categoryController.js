import Category from '../models/Category.js';

// Get default categories
export const getDefaultCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isDefault: true });
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
};

// Create category
export const createCategory = async (req, res) => {
  try {
    const { name, icon, color } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(409).json({ message: 'Category already exists' });
    }

    const category = new Category({
      name,
      icon: icon || '📌',
      color: color || '#3498db',
      isDefault: false
    });

    await category.save();

    res.status(201).json({
      message: 'Category created successfully',
      category
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error: error.message });
  }
};

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
};

// Update category
export const updateCategory = async (req, res) => {
  try {
    const { name, icon, color } = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, icon, color },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({
      message: 'Category updated successfully',
      category
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error: error.message });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({
      message: 'Category deleted successfully',
      category
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error: error.message });
  }
};
