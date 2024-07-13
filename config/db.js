import mongoose from 'mongoose';

const connectDB = async () => {
  return mongoose.connect(url);
};

export default connectDB;
