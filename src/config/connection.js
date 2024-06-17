import mongoose from 'mongoose';
import 'dotenv/config'

export const connectionString = process.env.MONGO_LOCAL_URL

export async function connectToDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to MongoDB database');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

export default mongoose.connection;