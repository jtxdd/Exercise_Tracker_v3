import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const User = new mongoose.Schema({
  user_id:    ObjectId,
  username: { type: String, required: true },
});

module.exports = mongoose.model('User', User);