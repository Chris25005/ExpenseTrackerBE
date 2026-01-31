import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import Category from './models/Category.js';

dotenv.config();

const app = express();

/* =========================
   ✅ CORS CONFIG (NETLIFY FIXED)
========================= */
app.use(cors({
  origin: [
    'https://superb-pony-da8703.netlify.app', // Netlify FE
    'http://localhost:3000'                  // Local FE (optional)
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

/* =========================
   ✅ MIDDLEWARE
========================= */
app.use(express.json());

/* =========================
   ✅ DEFAULT CATEGORIES
========================= */
const defaultCategories = [
  { name: "Food", icon: "🍔", color: "#FF6B6B", isDefault: true },
  { name: "Travel", icon: "✈️", color: "#4ECDC4", isDefault: true },
  { name: "Shopping", icon: "🛍️", color: "#FFE66D", isDefault: true },
  { name: "Entertainment", icon: "🎬", color: "#95E1D3", isDefault: true },
  { name: "Rent", icon: "🏠", color: "#C7CEEA", isDefault: true },
  { name: "Medical", icon: "⚕️", color: "#FF9F9F", isDefault: true },
  { name: "Utilities", icon: "💡", color: "#B19CD9", isDefault: true },
  { name: "Education", icon: "📚", color: "#A8D8EA", isDefault: true },
  { name: "Salary", icon: "💰", color: "#98FF98", isDefault: true },
  { name: "Freelance", icon: "💻", color: "#FFB366", isDefault: true },
  { name: "Bonus", icon: "🎁", color: "#FF6B9D", isDefault: true },
  { name: "Other", icon: "📌", color: "#B0B0B0", isDefault: true }
];

const seedCategories = async () => {
  try {
    const count = await Category.countDocuments();
    if (count === 0) {
      console.log('📌 Seeding default categories...');
      await Category.insertMany(defaultCategories);
      console.log('✅ Default categories created');
    }
  } catch (error) {
    console.error('⚠️ Error seeding categories:', error.message);
  }
};

/* =========================
   ✅ DATABASE CONNECTION
========================= */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
    await seedCategories();
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

connectDB();

/* =========================
   ✅ ROUTES
========================= */
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/categories', categoryRoutes);

/* =========================
   ✅ HEALTH CHECK
========================= */
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Backend is running 🚀' });
});

/* =========================
   ✅ ERROR HANDLER
========================= */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message
  });
});

/* =========================
   ✅ SERVER START
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
