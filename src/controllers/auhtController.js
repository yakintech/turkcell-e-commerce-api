const jwt = require('jsonwebtoken');



const authController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        if (email === 'admin@mail.com' && password === '123') {
            const token = jwt.sign({ email }, 'jwtSecret');

            res.cookie('token', token, {
                httpOnly: true,
            });

            return res.json({ message: 'Login successful' });
        }
        else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    }
}

module.exports = authController;