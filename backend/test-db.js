import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

const testMongoDBConnection = async () => {
    try {
        console.log('🔄 Testing MongoDB connection...');
        console.log('📍 Connection URL:', process.env.MONGODB_URI.replace(/:[^:@]+@/, ':****@')); // Hide password

        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log('✅ MongoDB Connected Successfully!');
        console.log('📊 Database Host:', conn.connection.host);
        console.log('📁 Database Name:', conn.connection.name);
        console.log('🔌 Connection State:', conn.connection.readyState === 1 ? 'Connected' : 'Not Connected');

        // Test a simple operation
        const collections = await conn.connection.db.listCollections().toArray();
        console.log('📚 Available Collections:', collections.length > 0 ? collections.map(c => c.name).join(', ') : 'No collections yet (database is new)');

        // Close the connection
        await mongoose.connection.close();
        console.log('🔒 Connection closed successfully');
        process.exit(0);
    } catch (error) {
        console.error('❌ MongoDB Connection Failed!');
        console.error('Error:', error.message);
        process.exit(1);
    }
};

testMongoDBConnection();
