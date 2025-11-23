import mongoose from 'mongoose';

const queryLogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  text: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['health', 'education', 'climate', 'safety', 'general'],
    required: true
  },
  language: {
    type: String,
    default: 'en'
  },
  response: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', null],
    default: null,
    sparse: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
});

// Index for community alert detection
queryLogSchema.index({ location: 1, category: 1, timestamp: 1 });

const QueryLog = mongoose.model('QueryLog', queryLogSchema);
export default QueryLog;
