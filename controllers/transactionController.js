import Transaction from '../models/Transaction.js';

// Create Transaction
export const createTransaction = async (req, res) => {
  try {
    const { amount, type, category, description, date, paymentMethod, userId } = req.body;

    if (!amount || !type || !category || !date) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const transaction = new Transaction({
      userId,
      amount,
      type,
      category,
      description,
      date: new Date(date),
      paymentMethod: paymentMethod || 'cash'
    });

    await transaction.save();
    res.status(201).json({
      message: 'Transaction created successfully',
      transaction
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating transaction', error: error.message });
  }
};

// Get all transactions for user
export const getTransactions = async (req, res) => {
  try {
    const { startDate, endDate, category, type, userId } = req.query;

    let filter = { userId: userId };

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    if (category) {
      filter.category = category;
    }

    if (type) {
      filter.type = type;
    }

    const transactions = await Transaction.find(filter).sort({ date: -1 });

    res.status(200).json({
      count: transactions.length,
      transactions
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error: error.message });
  }
};

// Get single transaction
export const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json({ transaction });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transaction', error: error.message });
  }
};

// Update Transaction
export const updateTransaction = async (req, res) => {
  try {
    const { amount, type, category, description, date, paymentMethod } = req.body;

    let transaction = await Transaction.findOne({
      _id: req.params.id,
      userId: req.body.userId
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    transaction.amount = amount || transaction.amount;
    transaction.type = type || transaction.type;
    transaction.category = category || transaction.category;
    transaction.description = description || transaction.description;
    transaction.date = date ? new Date(date) : transaction.date;
    transaction.paymentMethod = paymentMethod || transaction.paymentMethod;

    await transaction.save();

    res.status(200).json({
      message: 'Transaction updated successfully',
      transaction
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating transaction', error: error.message });
  }
};

// Delete Transaction
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.params.userId
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json({
      message: 'Transaction deleted successfully',
      transaction
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting transaction', error: error.message });
  }
};

// Get monthly summary
export const getMonthlySummary = async (req, res) => {
  try {
    const { year, month, userId: queryUserId } = req.query; // Destructure userId from query

    if (!year || !month) {
      return res.status(400).json({ message: 'Year and month are required' });
    }

    // Convert month to 0-indexed (2 becomes 1 for February)
    const monthIndex = parseInt(month) - 1;
    const startDate = new Date(year, monthIndex, 1);
    const endDate = new Date(year, monthIndex + 1, 0);
    endDate.setHours(23, 59, 59, 999); // Include the full last day

    const transactions = await Transaction.find({
      userId: queryUserId || req.userId, // Use ID from query or middleware
      date: { $gte: startDate, $lte: endDate }
    });

    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const categoryExpense = {};
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        categoryExpense[t.category] = (categoryExpense[t.category] || 0) + t.amount;
      });

    res.status(200).json({
      month,
      year,
      income,
      expense,
      savings: income - expense,
      categoryExpense,
      transactions
    });
  } catch (error) {
    res.status(500).json({ message: 'Error getting summary', error: error.message });
  }
};

// Get yearly summary
export const getYearlySummary = async (req, res) => {
  try {
    const { year, userId: queryUserId } = req.query; // Capture userId from query

    if (!year) {
      return res.status(400).json({ message: 'Year is required' });
    }

    // 1. Create a date range for the entire year
    // Start: January 1st of the requested year
    const startDate = new Date(year, 0, 1);
    
    // End: December 31st (Day 0 of next year's January)
    const endDate = new Date(parseInt(year) + 1, 0, 0);
    endDate.setHours(23, 59, 59, 999); // Ensure we include the final day's transactions

    // 2. Query transactions using userId from query or middleware
    const transactions = await Transaction.find({
      userId: queryUserId || req.userId, 
      date: { $gte: startDate, $lte: endDate }
    });

    // 3. Initialize monthly buckets
    const monthlyData = {};
    for (let i = 1; i <= 12; i++) {
      monthlyData[i] = { income: 0, expense: 0, savings: 0 };
    }

    // 4. Group transactions by month
    transactions.forEach(t => {
      // getMonth() returns 0-11, so we add 1 to match our 1-12 keys
      const month = t.date.getMonth() + 1;
      if (t.type === 'income') {
        monthlyData[month].income += t.amount;
      } else if (t.type === 'expense') {
        monthlyData[month].expense += t.amount;
      }
    });

    // 5. Calculate savings for each month
    Object.keys(monthlyData).forEach(month => {
      monthlyData[month].savings = monthlyData[month].income - monthlyData[month].expense;
    });

    // 6. Calculate grand totals
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    res.status(200).json({
      year,
      totalIncome,
      totalExpense,
      totalSavings: totalIncome - totalExpense,
      monthlyData
    });
  } catch (error) {
    res.status(500).json({ message: 'Error getting yearly summary', error: error.message });
  }
};

// Get dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    const allTransactions = await Transaction.find({ userId: req.body.userId }).sort({ date: -1 });

    const totalIncome = allTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = allTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const recentTransactions = allTransactions.slice(0, 5);

    const categoryBreakdown = {};
    allTransactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        categoryBreakdown[t.category] = (categoryBreakdown[t.category] || 0) + t.amount;
      });

    res.status(200).json({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      recentTransactions,
      categoryBreakdown
    });
  } catch (error) {
    res.status(500).json({ message: 'Error getting dashboard stats', error: error.message });
  }
};
