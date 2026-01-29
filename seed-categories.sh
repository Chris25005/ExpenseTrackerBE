#!/bin/bash

# MongoDB Category Seed Script
# Run this after MongoDB is set up to populate default categories

MONGODB_HOST="localhost"
MONGODB_PORT="27017"
DB_NAME="expense_tracker"

echo "🌱 Seeding MongoDB with default categories..."
echo ""

mongosh "$MONGODB_HOST:$MONGODB_PORT/$DB_NAME" <<EOF
db.categories.deleteMany({});

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

console.log("✅ Categories seeded successfully!");
EOF

echo ""
echo "🎉 Done! Default categories have been added to MongoDB"
