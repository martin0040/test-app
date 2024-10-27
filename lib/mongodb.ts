import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI || '';
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error connecting to MongoDB: ${error.message}`);
    } else {
      console.error(`Error connecting to MongoDB: ${String(error)}`);
    }
    process.exit(1);
  }
};

export default connectDB;
