const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: Number,
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  link: String,
  category: String,
  purchased: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Item', itemSchema);
