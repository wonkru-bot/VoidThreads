import dotenv from 'dotenv';
dotenv.config();

const allowedOrigins = [
    'http://192.168.104.240:3000',
    'https://vt.emke.live',
    'http://localhost:3000',
    'http://localhost:5000',
    'http://185.185.127.18:3000',
    'http://185.185.127.18:5000'
];

// process.env.CLIENT_URL,
// 'http://192.168.1.5:3000',
// 'http://localhost:3000',
// 'http://localhost:5000',
// 'http://192.168.1.4:5000',

export default allowedOrigins;