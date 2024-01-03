const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  storage: {
    type: String,
    required: true,
  },
  ram: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  sim: {
    type: String,
    required: true,
  },
  processor: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Items = mongoose.model("Items", itemSchema);

module.exports = Items;
