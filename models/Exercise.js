import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const Exercise = new mongoose.Schema({
  for_userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description: { type: String, required: true },
  duration:    { type: Number, required: true },
  date:        { type: Date, default: Date.now }
});

module.exports = mongoose.model('Exercise', Exercise);