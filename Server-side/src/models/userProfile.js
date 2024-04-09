import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  firstName: String,
  lastName: String,
  picture: String,
  address: String,
  accountNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0.0,
  },
  referrals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  transactionHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction'
  }],
  predictions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BetPrediction'
  }]
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
