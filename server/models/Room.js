import mongoose from "mongoose";
import { Schema } from "mongoose";

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  authorName: {
    type: String,
    // required: true,
  },
  code: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

roomSchema.pre('save', async function (next) {
  try {
    const user = await mongoose.model('User').findById(this.author);
    if (!user) {
      throw new Error('User not found');
    }
    this.authorName = user.username;
    next();
  } catch (error) {
    next(error);
  }
});

const roomModel = mongoose.model('Room', roomSchema)
export default roomModel
