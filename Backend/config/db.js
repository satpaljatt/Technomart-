import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Ye line tumhare .env file se MONGO_URI uthayegi
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Agar connect nahi hua to server band ho jayega
    }
};

export default connectDB;