@echo off
REM MongoDB Category Seed Script for Windows
REM Run this after MongoDB is set up to populate default categories

echo.
echo Seeding MongoDB with default categories...
echo.

REM Check if mongosh is installed
where mongosh >nul 2>nul
if %errorlevel% neq 0 (
    echo MongoDB Shell (mongosh) is not found in PATH
    echo Please install MongoDB Community Edition from: https://www.mongodb.com/try/download/community
    echo.
    pause
    exit /b 1
)

mongosh localhost:27017/expense_tracker ^
  --eval "db.categories.deleteMany({}); db.categories.insertMany([ ^
    {name: 'Food', icon: '🍔', color: '#FF6B6B', isDefault: true, createdAt: new Date(), updatedAt: new Date()}, ^
    {name: 'Travel', icon: '✈️', color: '#4ECDC4', isDefault: true, createdAt: new Date(), updatedAt: new Date()}, ^
    {name: 'Shopping', icon: '🛍️', color: '#FFE66D', isDefault: true, createdAt: new Date(), updatedAt: new Date()}, ^
    {name: 'Entertainment', icon: '🎬', color: '#95E1D3', isDefault: true, createdAt: new Date(), updatedAt: new Date()}, ^
    {name: 'Rent', icon: '🏠', color: '#C7CEEA', isDefault: true, createdAt: new Date(), updatedAt: new Date()}, ^
    {name: 'Medical', icon: '⚕️', color: '#FF9F9F', isDefault: true, createdAt: new Date(), updatedAt: new Date()}, ^
    {name: 'Utilities', icon: '💡', color: '#B19CD9', isDefault: true, createdAt: new Date(), updatedAt: new Date()}, ^
    {name: 'Education', icon: '📚', color: '#A8D8EA', isDefault: true, createdAt: new Date(), updatedAt: new Date()}, ^
    {name: 'Salary', icon: '💰', color: '#98FF98', isDefault: true, createdAt: new Date(), updatedAt: new Date()}, ^
    {name: 'Freelance', icon: '💻', color: '#FFB366', isDefault: true, createdAt: new Date(), updatedAt: new Date()}, ^
    {name: 'Bonus', icon: '🎁', color: '#FF6B9D', isDefault: true, createdAt: new Date(), updatedAt: new Date()}, ^
    {name: 'Other', icon: '📌', color: '#B0B0B0', isDefault: true, createdAt: new Date(), updatedAt: new Date()} ^
  ]); console.log('Categories seeded successfully!');"

echo.
echo Done! Default categories have been added to MongoDB
echo.
pause
