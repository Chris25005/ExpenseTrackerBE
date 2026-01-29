import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    amount: {
      type: Number,
      required: [true, 'Please provide an amount'],
      min: 0
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: [true, 'Please specify income or expense']
    },
    category: {
      type: String,
      required: [true, 'Please provide a category']
    },
    description: {
      type: String,
      trim: true
    },
    date: {
      type: Date,
      required: true
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'card', 'online', 'upi', 'other'],
      default: 'cash'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Index for better query performance
transactionSchema.index({ userId: 1, date: -1 });
transactionSchema.index({ userId: 1, type: 1 });
transactionSchema.index({ userId: 1, category: 1 });

export default mongoose.model('Transaction', transactionSchema);
