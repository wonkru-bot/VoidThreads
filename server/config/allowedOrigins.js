import dotenv from 'dotenv';
dotenv.config();

const allowedOrigins = [
    // process.env.CLIENT_SIDE_URL,
    'http://192.168.1.4:3000',
    'http://192.168.1.4:5000',
    'http://localhost:3000',
    'http://192.168.1.39:3000',
    'http://192.168.115.240:3000',

    // '*' // Allow requests from any origin || Jkmown@123#
];

export default allowedOrigins;
