// This file contains sample data for seeding the database with default categories
// Run this in MongoDB or through a seed script

db.categories.insertMany([
  {
    name: "Food",
    icon: "🍔",
    color: "#FF6B6B",
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Travel",
    icon: "✈️",
    color: "#4ECDC4",
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Shopping",
    icon: "🛍️",
    color: "#FFE66D",
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Entertainment",
    icon: "🎬",
    color: "#95E1D3",
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Rent",
    icon: "🏠",
    color: "#C7CEEA",
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Medical",
    icon: "⚕️",
    color: "#FF9F9F",
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Utilities",
    icon: "💡",
    color: "#B19CD9",
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Education",
    icon: "📚",
    color: "#A8D8EA",
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Salary",
    icon: "💰",
    color: "#98FF98",
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Freelance",
    icon: "💻",
    color: "#FFB366",
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bonus",
    icon: "🎁",
    color: "#FF6B9D",
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Other",
    icon: "📌",
    color: "#B0B0B0",
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);
