/**
 *Connect to mongodb datatbase using mongoose.
 *Mongoose-auto-increment cahnges default _id behaviour.
 */
import mongoose from 'mongoose';
import { initialize } from 'mongoose-auto-increment';

require('dotenv').config();
mongoose.connect(process.env.DATABASE_URL);
initialize(mongoose.connection);
export default mongoose;
