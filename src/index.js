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
const clientAuthController = require('./controllers/clientAuthController');
const clientAuthMiddleware = require('./middleware/clientAuthMiddleware');

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['https://hammerhead-app-psjfp.ondigitalocean.app', 'http://localhost:3000'],
    credentials: true,
}));


connectDB()
app.post('/login', authController.login);
app.get("/check", authMiddleware, authController.check)
app.post("/logout", authController.logout)


app.post('/client/login', clientAuthController.login);
app.get("/client/check", clientAuthMiddleware, clientAuthController.check)
app.post("/client/logout", clientAuthController.logout)


app.get("/api/products", productController.getAll)
app.post("/api/products", authMiddleware, productController.add)
app.delete("/api/products/:id", authMiddleware, productController.remove)




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})