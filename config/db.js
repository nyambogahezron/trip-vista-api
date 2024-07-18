import mongoose from 'mongoose';

const connectDB = async (url) => {
  return mongoose.connect(url);
};

export default connectDB;
