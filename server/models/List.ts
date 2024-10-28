import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true,
    unique: true,
  },
  link: {
    type: String,
    required: true,
  }
});

const User = mongoose.model('List', userSchema);
export default User;
