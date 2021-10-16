import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// Define user schema
const userSchema = new mongoose.Schema({

  fullName: {
    type: String, required: true, minlength: 3, maxlength: 100, trim: true
  },

  nationality: {
    type: String, required: true, minlength: 3, maxlength: 100, trim: true
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true
  },

  age: {
    type: Number,
    required: true

  },

  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 60
  },

  role: {
    type: String,
    lowercase: true,
    enum: ['manager', 'player'],
    default: 'player',
    required: true
  }

}, { timestamps: true });

// Define static method to be used on User object
userSchema.methods.generateAuthToken = function t() {
  const token = jwt.sign({
    _id: this._id,
    email: this.email,
    role: this.role
  }, process.env.JWT_SECRET, { expiresIn: '7 days' });

  return token;
};

userSchema.set('toJSON', {
  versionKey: false,
  transform(doc, ret) {
    // eslint-disable-next-line no-param-reassign
    delete ret.password;
  }
});

// Define User model based on user schema
const User = mongoose.model('User', userSchema);

export default User;
