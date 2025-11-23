import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  area: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['health', 'education', 'climate', 'safety', 'general'],
    required: true
  },
  count: {
    type: Number,
    required: true,
    default: 1
  },
  detectedAt: {
    type: Date,
    default: Date.now
  },
  queries: [{
    userId: mongoose.Schema.Types.ObjectId,
    text: String,
    timestamp: Date
  }],
  severity: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  }
});

const Alert = mongoose.model('Alert', alertSchema);
export default Alert;
