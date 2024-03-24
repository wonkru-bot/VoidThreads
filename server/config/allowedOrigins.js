import dotenv from 'dotenv';
dotenv.config();

const allowedOrigins = [
    'http://192.168.1.5:3001',
    'http://localhost:3001',
];

// process.env.CLIENT_URL,
// 'http://192.168.1.5:3001',
// 'http://localhost:3001',
// 'http://localhost:5001',
// 'http://192.168.1.4:5001',

export default allowedOrigins;