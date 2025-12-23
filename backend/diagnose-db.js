import dotenv from 'dotenv';
import mongoose from 'mongoose';
import dns from 'dns';
import { promisify } from 'util';

dotenv.config();

const resolveSrv = promisify(dns.resolveSrv);

const diagnoseConnection = async () => {
    console.log('🔍 MongoDB Connection Diagnostics\n');
    console.log('='.repeat(60));

    // Parse the connection string
    const uri = process.env.MONGODB_URI;
    const maskedUri = uri.replace(/:[^:@]+@/, ':****@');
    console.log('📍 Connection URL:', maskedUri);
    console.log('');

    // Test DNS resolution for MongoDB Atlas
    try {
        console.log('🌐 Testing DNS resolution...');
        const srvRecords = await resolveSrv('_mongodb._tcp.cluster0.iravbzc.mongodb.net');
        console.log('✅ DNS resolution successful');
        console.log('   Found', srvRecords.length, 'SRV records');
        console.log('');
    } catch (error) {
        console.log('❌ DNS resolution failed:', error.message);
        console.log('');
    }

    // Try connecting with different TLS options
    console.log('🔐 Attempting connection with TLS...');

    try {
        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });

        console.log('✅ MongoDB Connected Successfully!');
        console.log('');
        console.log('📊 Connection Details:');
        console.log('   Host:', conn.connection.host);
        console.log('   Database:', conn.connection.name);
        console.log('   State:', conn.connection.readyState === 1 ? 'Connected' : 'Not Connected');
        console.log('');

        // Test database operation
        const collections = await conn.connection.db.listCollections().toArray();
        console.log('📚 Collections:', collections.length > 0 ? collections.map(c => c.name).join(', ') : 'None (new database)');

        await mongoose.connection.close();
        console.log('');
        console.log('🔒 Connection closed successfully');
        process.exit(0);

    } catch (error) {
        console.log('❌ Connection Failed!');
        console.log('');
        console.log('Error Type:', error.name);
        console.log('Error Message:', error.message);
        console.log('');

        if (error.message.includes('IP') || error.message.includes('whitelist')) {
            console.log('💡 Solution: Add your IP to MongoDB Atlas Network Access');
            console.log('   1. Go to https://cloud.mongodb.com');
            console.log('   2. Select your cluster');
            console.log('   3. Click "Network Access" → "Add IP Address"');
            console.log('   4. Add your current IP or allow 0.0.0.0/0 for testing');
        } else if (error.message.includes('authentication')) {
            console.log('💡 Solution: Check your database credentials');
            console.log('   - Verify username and password in MongoDB Atlas');
        } else if (error.message.includes('SSL') || error.message.includes('TLS')) {
            console.log('💡 Possible Issues:');
            console.log('   - IP not whitelisted in MongoDB Atlas');
            console.log('   - Firewall blocking outbound connections');
            console.log('   - Network configuration issue');
        }

        console.log('');
        process.exit(1);
    }
};

diagnoseConnection();
