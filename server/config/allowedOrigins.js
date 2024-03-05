import dotenv from 'dotenv';
dotenv.config();

const allowedOrigins = [
    process.env.CLIENT_URL,
    'http://192.168.1.4:3000',
    'http://localhost:3000',
    'http://localhost:5000',
    'http://192.168.1.4:5000',
];

export default allowedOrigins;