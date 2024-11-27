const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config()
const authController = require('./controllers/auhtController');
const authMiddleware = require('./middleware/authMiddleware');
const productController = require('./controllers/productController');
const connectDB = require('./config/db');

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));


connectDB()
app.post('/login', authController.login);
app.get("/check", authMiddleware, authController.check)

app.get("/api/products", authMiddleware, productController.getAll)
app.post("/api/products", authMiddleware, productController.add)
app.delete("/api/products/:id", authMiddleware, productController.remove)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})