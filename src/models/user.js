/*User schema: Defines structure of users model*/
import mongoose from '../config/db';
import { plugin } from 'mongoose-auto-increment';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  name: {
    first: {
      type: String,
      required: true,
    },

    last: {
      type: String,
      required: true,
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: String,
});

userSchema.plugin(plugin, {
  model: 'User',
  startAt: 1,
});

export default mongoose.model('Users', userSchema);
