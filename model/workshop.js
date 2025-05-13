const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  day: { type: String, required: true },
  time: { type: String, required: true }
});

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true }
});

const workshopSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: String, required: true },
  capacity: { type: Number, required: true },
  difficulty: { 
    type: String, 
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  materials: { type: String },
  image: { type: String },
  contact: { type: contactSchema, required: true },
  schedule: { type: [scheduleSchema], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Workshop', workshopSchema);