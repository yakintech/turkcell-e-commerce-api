const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authController = require('./controllers/auhtController');

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.post('/login', authController.login);




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})