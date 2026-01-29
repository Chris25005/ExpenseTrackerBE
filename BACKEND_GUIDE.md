# Backend File Structure

## /backend/

### 📁 Core Files
- **server.js** - Express server setup and database connection
- **package.json** - Backend dependencies and scripts
- **.env** - Environment variables (NOT committed to git)

### 📁 /models
- **User.js** - User schema (name, email, password with hashing)
- **Transaction.js** - Transaction schema (amount, type, category, date, etc.)
- **Category.js** - Category schema (name, icon, color)

### 📁 /controllers
- **authController.js** - Authentication logic
  - `registerUser()` - User registration
  - `loginUser()` - User login
  - `getCurrentUser()` - Fetch current user
  - `updateUserProfile()` - Update user profile

- **transactionController.js** - Transaction CRUD operations
  - `createTransaction()` - Add new transaction
  - `getTransactions()` - Fetch transactions with filters
  - `getTransaction()` - Get single transaction
  - `updateTransaction()` - Update transaction
  - `deleteTransaction()` - Delete transaction
  - `getMonthlySummary()` - Get monthly report
  - `getYearlySummary()` - Get yearly report
  - `getDashboardStats()` - Get dashboard data

- **categoryController.js** - Category management
  - `getDefaultCategories()` - Get default categories
  - `getAll()` - Get all categories
  - `createCategory()` - Create custom category
  - `updateCategory()` - Update category
  - `deleteCategory()` - Delete category

### 📁 /routes
- **authRoutes.js** - Authentication endpoints
- **transactionRoutes.js** - Transaction endpoints
- **categoryRoutes.js** - Category endpoints

### 📁 /middleware
- **auth.js** - JWT verification middleware

## Running Backend

```bash
cd backend
npm install
npm start
```

## Testing Backend

Use Postman or cURL to test endpoints:

### Register
```bash
POST http://localhost:5000/api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

### Login
```bash
POST http://localhost:5000/api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Transaction
```bash
POST http://localhost:5000/api/transactions
Authorization: Bearer <token>
{
  "amount": 500,
  "type": "expense",
  "category": "Food",
  "description": "Lunch at restaurant",
  "date": "2024-01-28",
  "paymentMethod": "card"
}
```

### Get Dashboard Stats
```bash
GET http://localhost:5000/api/transactions/stats/dashboard
Authorization: Bearer <token>
```

## Database Indexes

Indexes are automatically created for:
- `userId + date` - Fast date-based queries
- `userId + type` - Fast type filtering
- `userId + category` - Fast category filtering
