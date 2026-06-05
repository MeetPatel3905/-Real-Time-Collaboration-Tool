import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbConnect = async () => {
  const db = process.env.MONGODB_URI;
  
  try {
    await mongoose.connect(db);
    console.log('Connected to MongoDB...');
  } catch (err) {
    console.log('Could not connect to MongoDB...', err);
    process.exit(1);
  }
};

export default dbConnect;
