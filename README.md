
# 💰 Expense Tracker - MERN Stack Application

A comprehensive web-based financial management system built with the MERN stack (MongoDB, Express.js, React.js, Node.js) to help users track, analyze, and control their daily income and expenses efficiently.

## 🎯 Features

### ✅ User Authentication & Security
- User registration and login with JWT-based authentication
- Secure password hashing with bcryptjs
- Personal expense data isolation per user
- Token-based authorization for API endpoints

### 💼 Income & Expense Management
- Add, edit, and delete transactions
- Support for both income and expense entries
- Date-wise transaction recording
- Notes/description for each transaction
- Multiple payment methods (cash, card, online, UPI)

### 🏷️ Category-Wise Expense Tracking
- Predefined categories (Food, Travel, Rent, Shopping, Medical, etc.)
- Custom category creation
- Category-wise expense analysis
- Color-coded categories for better visualization

### 📊 Data Visualization
- **Pie Chart** - Category-wise expense distribution
- **Bar Chart** - Monthly income vs expenses comparison
- **Line Chart** - Spending trends over time
- Real-time chart updates

### 📈 Reports & Analytics
- Monthly income vs expense summary
- Yearly financial overview
- Savings estimation
- Category breakdown analysis
- Filter transactions by date range, category, and type

### 📱 Dashboard Overview
- Total income display
- Total expenses display
- Current balance calculation
- Recent transactions list
- Visual summary cards
- Category spending breakdown

### 🔍 Search & Filter Options
- Filter by date range
- Filter by category
- Filter by income/expense type
- Advanced search functionality

### 📱 Responsive UI
- Works on desktop, tablet, and mobile
- Clean and user-friendly design
- Fast loading React components
- Bootstrap-based styling

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm start
# or 
npm run dev
```

The backend will run on `http://localhost:5000`



## 🚀 Usage

### 1. User Registration
- Go to `/register` page
- Enter name, email, password
- Click "Register"

### 2. User Login
- Go to `/login` page
- Enter email and password
- Click "Login"

### 3. Dashboard
- View total income, expenses, and balance
- See recent transactions
- View expense distribution by category
- Quick overview of financial status

### 4. Add Transaction
- Click "Add Transaction" button
- Select type (Income/Expense)
- Choose category
- Enter amount
- Add date and description
- Select payment method
- Click "Add Transaction"

### 5. View & Manage Transactions
- Go to Transactions page
- Filter by type, category, or date range
- Edit any transaction
- Delete transactions

### 6. View Reports
- Go to Reports page
- Select report type (Monthly/Yearly)
- Choose year and month
- Generate report with charts and analysis
- View category breakdown and savings ratio


## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)
- `PUT /api/auth/profile` - Update user profile (requires auth)

### Transactions
- `POST /api/transactions` - Create transaction (requires auth)
- `GET /api/transactions` - Get all transactions (requires auth)
- `GET /api/transactions/:id` - Get single transaction (requires auth)
- `PUT /api/transactions/:id` - Update transaction (requires auth)
- `DELETE /api/transactions/:id` - Delete transaction (requires auth)
- `GET /api/transactions/summary/monthly` - Get monthly summary (requires auth)
- `GET /api/transactions/summary/yearly` - Get yearly summary (requires auth)
- `GET /api/transactions/stats/dashboard` - Get dashboard stats (requires auth)

### Categories
- `GET /api/categories/default` - Get default categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category



